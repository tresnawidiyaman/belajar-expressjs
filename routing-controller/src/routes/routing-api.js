//Mendifinisikan app sebagai routing dengan express
const app = require('express').Router();
//Mengarahkan file query controller menjadi variabel siswa
const siswa = require('../controllers/siswa-config');

//Menampilkan semua data
app.get('/api/siswa', siswa.getdata);

//Menampilkan data berdasarkan id
app.get('/api/siswa/:id', siswa.getdataid);

//Menambahkan data baru
app.post('/api/siswa/add', siswa.adddata);

//Mengubah data yang sudah ada
app.put('/api/siswa/edit/:id', siswa.editdata);

//Mengapus data
app.delete('/api/siswa/delete/:id', siswa.deletedata);

//Melakukan Export module dari routing
module.exports = app;