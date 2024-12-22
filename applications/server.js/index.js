//libs ========================================================================

const express = require('express');
const app = express();
const mysql = require("mysql2/promise");

// Server ===================================================================

var server = app.listen(port, function () {
   console.log(`Servidor iniciado na porta: ${port}`)
})