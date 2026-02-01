// 1. นำเข้า Library ที่จำเป็นให้ครบ
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    serverTimestamp, 
    query, 
    orderBy, 
    onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyA4h28pZMMjCe6rfGp0N4szWZNoAlll-IY",
    authDomain: "mini-project-37403.firebaseapp.com",
    databaseURL: "https://mini-project-37403-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mini-project-37403",
    storageBucket: "mini-project-37403.firebasestorage.app",
    messagingSenderId: "167901415518",
    appId: "1:167901415518:web:1ade1db1debdf7d1244ccf",
    measurementId: "G-J7ZPR2X4S2"
};

// 3. เริ่มต้น Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- ส่วนแสดงผลข้อมูลการจอง ---
const bookingDataContainer = document.getElementById('bookingData');

// ตรวจสอบว่ามี element นี้อยู่ใน HTML หรือไม่
if (bookingDataContainer) {
    const q = query(collection(db, "bookings"), orderBy("timestamp", "desc"));

    // ใช้ onSnapshot เพื่อดึงข้อมูลแบบ Real-time
    onSnapshot(q, (querySnapshot) => {
        bookingDataContainer.innerHTML = ""; 
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // ป้องกัน Error กรณี timestamp ยังเป็น null (ตอนกำลังบันทึก)
            const date = data.timestamp ? data.timestamp.toDate().toLocaleString('th-TH') : 'กำลังบันทึก...';
            
            const row = `
                <tr>
                    <td data-label="ที่พัก">${data.hotelName || '-'}</td>
                    <td data-label="ชื่อผู้จอง">${data.guestName || '-'}</td>
                    <td data-label="เบอร์โทรศัพท์">${data.guestPhone || '-'}</td>
                    <td data-label="วันที่จอง">${date}</td>
                </tr>
            `;
            bookingDataContainer.innerHTML += row;
        });
    }, (error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        // ถ้าขึ้น error เกี่ยวกับ "index" ให้คลิกที่ link ใน console เพื่อสร้าง index ครับ
    });
}

// --- ส่วนส่งฟอร์มจองที่พัก (ถ้ามีในหน้านี้) ---
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "bookings"), {
                hotelName: document.getElementById('hotelName').value,
                guestName: document.getElementById('guestName').value,
                guestPhone: document.getElementById('guestPhone').value,
                timestamp: serverTimestamp()
            });
            alert("จองสำเร็จ!");
            bookingForm.reset();
        } catch (err) {
            alert("จองไม่สำเร็จ: " + err.message);
        }
    });
}

// --- ส่วนส่ง Email (Report Form) ---
const reportForm = document.getElementById("report-form");
if (reportForm) {
    reportForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const response = await fetch(event.target.action, {
            method: reportForm.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            alert("ขอบคุณที่แจ้งปัญหา! ข้อมูลถูกส่งเรียบร้อยแล้ว");
            reportForm.reset();
        } else {
            alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
        }
    });
}
