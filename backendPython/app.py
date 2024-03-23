from flask import Flask, render_template, redirect, url_for, jsonify
import json
import cv2
import dlib
import numpy as np
from imutils import face_utils
from scipy.spatial import distance as dist
import torch
import time

app = Flask(__name__)

def eye_aspect_ratio(eye):
    A = dist.euclidean(eye[1], eye[5])
    B = dist.euclidean(eye[2], eye[4])
    C = dist.euclidean(eye[0], eye[3])
    ear = (A + B) / (2.0 * C)
    return ear

cap = None
attention_score = 0
total_phone_visible_time = 0
session_time = 0
video_processing = False

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start')
def start():
    global cap, attention_score, total_phone_visible_time, session_time, video_processing
    if not video_processing:
        video_processing = True
        model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
        detector = dlib.get_frontal_face_detector()
        predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")
        cap = cv2.VideoCapture(0)

        EYE_AR_THRESH = 0.25
        EAR_CONSEC_SECONDS = 3
        PHONE_VISIBLE_SECONDS = 5

        COUNTER = 0
        TOTAL = 0
        low_ear_start_time = 0
        phone_visible_start_time = 0
        not_paying_attention_time = 0
        total_phone_visible_time = 0
        session_start_time = time.time()

        while True:
            if not video_processing:
                break

            ret, frame = cap.read()
            if not ret:
                break

            current_time = time.time()
            session_time = current_time - session_start_time
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = detector(gray, 0)

            results = model(frame)
            phone_detections = results.pandas().xyxy[0]
            phones = phone_detections[phone_detections['name'] == 'cell phone']

            ear_below_threshold = False

            for face in faces:
                shape = predictor(gray, face)
                shape = face_utils.shape_to_np(shape)

                leftEye = shape[42:48]
                rightEye = shape[36:42]

                leftEAR = eye_aspect_ratio(leftEye)
                rightEAR = eye_aspect_ratio(rightEye)

                ear = (leftEAR + rightEAR) / 2.0

                if ear < EYE_AR_THRESH:
                    if low_ear_start_time == 0:
                        low_ear_start_time = current_time
                    elif current_time - low_ear_start_time >= EAR_CONSEC_SECONDS:
                        not_paying_attention_time += current_time - low_ear_start_time
                        low_ear_start_time = current_time
                else:
                    low_ear_start_time = 0

            if phones.empty:
                if phone_visible_start_time != 0 and current_time - phone_visible_start_time >= PHONE_VISIBLE_SECONDS:
                    not_paying_attention_time += (current_time - phone_visible_start_time)
                    total_phone_visible_time += (current_time - phone_visible_start_time) - .5 # -.5 for rounding error
                phone_visible_start_time = 0
            else:
                if phone_visible_start_time == 0:
                    phone_visible_start_time = current_time

            for index, row in phones.iterrows():
                cv2.rectangle(frame, (int(row['xmin']), int(row['ymin'])), (int(row['xmax']), int(row['ymax'])), (0, 255, 0), 2)
                if phone_visible_start_time != 0:
                    phone_time_visible = int(current_time - phone_visible_start_time)
                    cv2.putText(frame, f"{phone_time_visible}s", (int(row['xmin']), int(row['ymin']) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

            attention_time = session_time - not_paying_attention_time
            attention_score = (attention_time / session_time) * 100

            cv2.putText(frame, "Attention Score: {:.2f}%".format(attention_score), (10, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

            cv2.putText(frame, "Total Phone Time: {:.2f}s".format(total_phone_visible_time), (10, 100),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

            cv2.imshow("Frame", frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()
        video_processing = False
    return redirect(url_for('stop'))

def generate_json_response(attention_score, total_phone_visible_time, session_time):
    data = {
        "Final Attention Score": f"{attention_score:.2f}%",
        "Total Phone Usage": f"{total_phone_visible_time:.2f}s",
        "Total Time": f"{session_time:.2f}s"
    }
    return data

@app.route('/stop')
def stop():
    global video_processing
    video_processing = False
    json_response = generate_json_response(attention_score, total_phone_visible_time, session_time)
    print(attention_score, total_phone_visible_time, session_time)
    print("JSON Response:", json.dumps(json_response, indent=4))   
    return jsonify(json_response)

if __name__ == "__main__":
    app.run(debug=True)
