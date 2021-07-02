//Memasukan modul path
const path = require('path');
//Memasukan modul express js
const express = require('express');
//Memasukan modul bodyparser
const bodyParser = require('body-parser');
//Memasukan modul mysql database
const mysql = require('mysql');
//Menyatakan app sebagai fungsi express
const app = express();

//Membuat encoder json dari bodyparser
//Ini digunakan untuk mambaca data yang kita post melalui api
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Membuat konfigurasi database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'belajarapi_db'
});

//Membuat koneksi ke database
conn.connect((err) =>{
    if (err) throw err;
    console.log('mysql connected, yeah !');
});

//Menampilkan semua data
app.get('/api/siswa',(req, res) =>{
    let sql = "SELECT * FROM daftar_siswa";
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send({
            "status":200,
            "error":null,
            "message":'Berhasil menampilkan data',
            "response":result
        });
    });
});

//Menampilkan data berdasarkan id
app.get('/api/siswa/:id',(req, res) =>{
  let sql = "SELECT * FROM daftar_siswa WHERE siswa_id="+req.params.id;
  let query = conn.query(sql, (err, result) => {
      if (err) throw err;
      res.send({
          "status":200,
          "error":null,
          "message":'Berhasil menampilkan data',
          "response":result
      });
  });
});

//Menambahkan data baru
app.post('/api/siswa/add',(req, res) =>{
  //Parameter data yang akan ditambahkan
  let data = {
    siswa_nama: req.body.siswa_nama,
    siswa_kelas: req.body.siswa_kelas,
    siswa_alamat: req.body.siswa_alamat
  };
  let sql = "INSERT INTO daftar_siswa SET ?";
  let query = conn.query(sql, data, (err, result) => {
      if (err) throw err;
      res.send({
          "status":200,
          "error":null,
          "message":'Data berhasil ditambahkan',
      });
  });
});

//Mengubah data yang sudah ada
app.put('/api/siswa/edit/:id',(req, res) =>{
  //Parameter data yang akan diubah
  let data = {
    siswa_nama: req.body.siswa_nama,
    siswa_kelas: req.body.siswa_kelas,
    siswa_alamat: req.body.siswa_alamat
  };
  let sql = "UPDATE daftar_siswa SET ? WHERE siswa_id="+req.params.id;
  let query = conn.query(sql, data, (err, result) => {
      if (err) throw err;
      res.send({
          "status":200,
          "error":null,
          "message":'Data berhasil diubah',
      });
  });
});

//Mengapus data
app.delete('/api/siswa/delete/:id',(req, res) =>{
  let sql = "DELETE FROM daftar_siswa WHERE siswa_id="+req.params.id;
  let query = conn.query(sql, (err, result) => {
      if (err) throw err;
      res.send({
          "status":200,
          "error":null,
          "message":'Data berhasil dihapus',
      });
  });
});


//Server Listener
//nanti server ini akan dijalankan pada port tersebut
app.listen(8080,() =>{
    console.log('Server dijalankan pada port 8080')
});