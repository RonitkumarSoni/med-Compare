# 💊 MedCompare - API Documentation (Full Links & Method Wise)

Yeh document **Postman** testing ke liye banaya gaya hai. Isme sabhi APIs ko unke HTTP Method (**GET**, **POST**, **PUT**, **DELETE**) ke hisaab se sequence mein rakha gaya hai aur **Full Route Links** diye gaye hain.

**Note:** Localhost port default `5000` maana gaya hai. Agar aapka backend kisi aur port (e.g. 8000) pe chal raha hai, to usko modify kar lena. Production ke liye `http://localhost:5000` ko `https://med-compare-2wge.onrender.com` se replace kar dena.

---

## 🟢 1. GET Requests (Fetch Data)

| Request Name | Full Route Link | Auth Required |
| --- | --- | --- |
| Get All Medicines | `http://localhost:5000/api/medicines` | No |
| Compare Medicines | `http://localhost:5000/api/medicines/compare` | No |
| Get Nearby Medicines | `http://localhost:5000/api/medicines/nearby` | No |
| Get Medicine by ID | `http://localhost:5000/api/medicines/:id` | No |
| Get All Pharmacies | `http://localhost:5000/api/pharmacies` | No |
| Get Pharmacy by ID | `http://localhost:5000/api/pharmacies/:id` | No |
| Logout User | `http://localhost:5000/api/auth/logout` | No |
| Get Current User (Me) | `http://localhost:5000/api/auth/me` | Yes |
| Get My Pharmacy Analytics | `http://localhost:5000/api/pharmacies/my-analytics` | Yes (Pharmacy) |
| Get Pharmacy Analytics | `http://localhost:5000/api/pharmacies/:id/analytics` | Yes (Pharmacy/Admin) |
| Get My Inquiries | `http://localhost:5000/api/inquiries/my` | Yes |
| Get Pharmacy Inquiries | `http://localhost:5000/api/inquiries/pharmacy` | Yes (Pharmacy/Admin) |
| Get Dashboard Stats | `http://localhost:5000/api/dashboard/stats` | Yes |
| Get Watchlist | `http://localhost:5000/api/dashboard/watchlist` | Yes |
| Get Admin Dashboard | `http://localhost:5000/api/admin/dashboard` | Yes (Admin) |
| Get All Users (Admin) | `http://localhost:5000/api/admin/users` | Yes (Admin) |
| Get All Pharmacies (Admin)| `http://localhost:5000/api/admin/pharmacies` | Yes (Admin) |

---

## 🔵 2. POST Requests (Create/Submit Data)

| Request Name | Full Route Link | Auth Required |
| --- | --- | --- |
| Register User | `http://localhost:5000/api/auth/register` | No |
| Login User | `http://localhost:5000/api/auth/login` | No |
| Handle AI Chat | `http://localhost:5000/api/chat` | No |
| Register Pharmacy | `http://localhost:5000/api/pharmacies` | Yes (Pharmacy/Admin) |
| Add Medicine | `http://localhost:5000/api/medicines` | Yes (Pharmacy/Admin) |
| Create Inquiry | `http://localhost:5000/api/inquiries` | Yes |
| Upload Single Image | `http://localhost:5000/api/uploads/image` | Yes |
| Upload Multi Images | `http://localhost:5000/api/uploads/images` | Yes |
| Upload Prescription | `http://localhost:5000/api/uploads/prescription`| Yes |

---

## 🟠 3. PUT Requests (Update Data)

| Request Name | Full Route Link | Auth Required |
| --- | --- | --- |
| Update Profile | `http://localhost:5000/api/auth/update-profile` | Yes |
| Change Password | `http://localhost:5000/api/auth/change-password` | Yes |
| Update Pharmacy | `http://localhost:5000/api/pharmacies/:id` | Yes (Pharmacy/Admin) |
| Update Medicine | `http://localhost:5000/api/medicines/:id` | Yes (Pharmacy/Admin) |
| Respond to Inquiry | `http://localhost:5000/api/inquiries/:id/respond`| Yes (Pharmacy/Admin) |
| Verify/Update Pharmacy | `http://localhost:5000/api/admin/pharmacies/:id/verify`| Yes (Admin) |

---

## 🔴 4. DELETE Requests (Remove Data)

| Request Name | Full Route Link | Auth Required |
| --- | --- | --- |
| Delete Medicine | `http://localhost:5000/api/medicines/:id` | Yes (Pharmacy/Admin) |

---

### 💡 Postman Setup Tips:
1. **Dynamic IDs:** Jahan bhi `/:id` hai (jaise `http://localhost:5000/api/medicines/12345`), wahan `12345` ko actual Database ID se replace karein.
2. **Authentication (JWT):** Jisme **"Auth Required: Yes"** likha hai, usko test karne ke liye:
   - Pehle `Login User` API run karein aur wahan se token copy karein.
   - Dusri API ke **Headers** tab mein jaakar ye daalein:
     - **Key:** `Authorization`
     - **Value:** `Bearer aapka_copied_token_yahan_daalein`
   - Ya fir seedha Postman ke **Authorization** tab mein Type ko `Bearer Token` select karke token paste kar dein.
