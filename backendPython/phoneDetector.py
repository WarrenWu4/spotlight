import cv2
import dlib
import numpy as np
from imutils import face_utils
from scipy.spatial import distance as dist
import torch
import time

def eye_aspect_ratio(eye):
    A = dist.euclidean(eye[1], eye[5])
    B = dist.euclidean(eye[2], eye[4])
    C = dist.euclidean(eye[0], eye[3])
    ear = (A + B) / (2.0 * C)
    return ear

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

print(f"Final Attention Score: {attention_score:.2f}%")
print(f"Total Phone Usage: {total_phone_visible_time:.2f}s")
print(f"Total Time: {session_time:.2f}s")

cap.release()
cv2.destroyAllWindows()
