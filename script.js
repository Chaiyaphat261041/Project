// 3. นำเข้า Firestore (ฐานข้อมูล)
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Config ของคุณ
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

// เริ่มต้น Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // <--- สำคัญ! ต้องประกาศตัวแปร db เพื่อใช้ฐานข้อมูล



//ส่งMail
const form = document.getElementById("report-form");

if (form) {
    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // ป้องกันการรีโหลดหน้า
        const data = new FormData(event.target);
        
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert("ขอบคุณที่แจ้งปัญหา! ข้อมูลถูกส่งไปที่อีเมลเจ้าหน้าที่เรียบร้อยแล้ว");
            form.reset(); // ล้างข้อมูลในฟอร์ม
        } else {
            alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
        }
    });
}


