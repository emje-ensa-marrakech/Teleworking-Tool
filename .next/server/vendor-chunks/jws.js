/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/jws";
exports.ids = ["vendor-chunks/jws"];
exports.modules = {

/***/ "(rsc)/./node_modules/jws/index.js":
/*!***********************************!*\
  !*** ./node_modules/jws/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("/*global exports*/\nvar SignStream = __webpack_require__(/*! ./lib/sign-stream */ \"(rsc)/./node_modules/jws/lib/sign-stream.js\");\nvar VerifyStream = __webpack_require__(/*! ./lib/verify-stream */ \"(rsc)/./node_modules/jws/lib/verify-stream.js\");\n\nvar ALGORITHMS = [\n  'HS256', 'HS384', 'HS512',\n  'RS256', 'RS384', 'RS512',\n  'PS256', 'PS384', 'PS512',\n  'ES256', 'ES384', 'ES512'\n];\n\nexports.ALGORITHMS = ALGORITHMS;\nexports.sign = SignStream.sign;\nexports.verify = VerifyStream.verify;\nexports.decode = VerifyStream.decode;\nexports.isValid = VerifyStream.isValid;\nexports.createSign = function createSign(opts) {\n  return new SignStream(opts);\n};\nexports.createVerify = function createVerify(opts) {\n  return new VerifyStream(opts);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvandzL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsaUJBQWlCLG1CQUFPLENBQUMsc0VBQW1CO0FBQzVDLG1CQUFtQixtQkFBTyxDQUFDLDBFQUFxQjs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQixZQUFZO0FBQ1osY0FBYztBQUNkLGNBQWM7QUFDZCxlQUFlO0FBQ2Ysa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQSIsInNvdXJjZXMiOlsiRDpcXEVNSkUgcHJvamVjdHNcXFRlbGVUcmF2YWlsXFxUZWxld29ya2luZy1Ub29sXFxub2RlX21vZHVsZXNcXGp3c1xcaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypnbG9iYWwgZXhwb3J0cyovXG52YXIgU2lnblN0cmVhbSA9IHJlcXVpcmUoJy4vbGliL3NpZ24tc3RyZWFtJyk7XG52YXIgVmVyaWZ5U3RyZWFtID0gcmVxdWlyZSgnLi9saWIvdmVyaWZ5LXN0cmVhbScpO1xuXG52YXIgQUxHT1JJVEhNUyA9IFtcbiAgJ0hTMjU2JywgJ0hTMzg0JywgJ0hTNTEyJyxcbiAgJ1JTMjU2JywgJ1JTMzg0JywgJ1JTNTEyJyxcbiAgJ1BTMjU2JywgJ1BTMzg0JywgJ1BTNTEyJyxcbiAgJ0VTMjU2JywgJ0VTMzg0JywgJ0VTNTEyJ1xuXTtcblxuZXhwb3J0cy5BTEdPUklUSE1TID0gQUxHT1JJVEhNUztcbmV4cG9ydHMuc2lnbiA9IFNpZ25TdHJlYW0uc2lnbjtcbmV4cG9ydHMudmVyaWZ5ID0gVmVyaWZ5U3RyZWFtLnZlcmlmeTtcbmV4cG9ydHMuZGVjb2RlID0gVmVyaWZ5U3RyZWFtLmRlY29kZTtcbmV4cG9ydHMuaXNWYWxpZCA9IFZlcmlmeVN0cmVhbS5pc1ZhbGlkO1xuZXhwb3J0cy5jcmVhdGVTaWduID0gZnVuY3Rpb24gY3JlYXRlU2lnbihvcHRzKSB7XG4gIHJldHVybiBuZXcgU2lnblN0cmVhbShvcHRzKTtcbn07XG5leHBvcnRzLmNyZWF0ZVZlcmlmeSA9IGZ1bmN0aW9uIGNyZWF0ZVZlcmlmeShvcHRzKSB7XG4gIHJldHVybiBuZXcgVmVyaWZ5U3RyZWFtKG9wdHMpO1xufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/jws/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/jws/lib/data-stream.js":
/*!*********************************************!*\
  !*** ./node_modules/jws/lib/data-stream.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*global module, process*/\nvar Buffer = (__webpack_require__(/*! safe-buffer */ \"(rsc)/./node_modules/safe-buffer/index.js\").Buffer);\nvar Stream = __webpack_require__(/*! stream */ \"stream\");\nvar util = __webpack_require__(/*! util */ \"util\");\n\nfunction DataStream(data) {\n  this.buffer = null;\n  this.writable = true;\n  this.readable = true;\n\n  // No input\n  if (!data) {\n    this.buffer = Buffer.alloc(0);\n    return this;\n  }\n\n  // Stream\n  if (typeof data.pipe === 'function') {\n    this.buffer = Buffer.alloc(0);\n    data.pipe(this);\n    return this;\n  }\n\n  // Buffer or String\n  // or Object (assumedly a passworded key)\n  if (data.length || typeof data === 'object') {\n    this.buffer = data;\n    this.writable = false;\n    process.nextTick(function () {\n      this.emit('end', data);\n      this.readable = false;\n      this.emit('close');\n    }.bind(this));\n    return this;\n  }\n\n  throw new TypeError('Unexpected data type ('+ typeof data + ')');\n}\nutil.inherits(DataStream, Stream);\n\nDataStream.prototype.write = function write(data) {\n  this.buffer = Buffer.concat([this.buffer, Buffer.from(data)]);\n  this.emit('data', data);\n};\n\nDataStream.prototype.end = function end(data) {\n  if (data)\n    this.write(data);\n  this.emit('end', data);\n  this.emit('close');\n  this.writable = false;\n  this.readable = false;\n};\n\nmodule.exports = DataStream;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvandzL2xpYi9kYXRhLXN0cmVhbS5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBLGFBQWEsNEZBQTZCO0FBQzFDLGFBQWEsbUJBQU8sQ0FBQyxzQkFBUTtBQUM3QixXQUFXLG1CQUFPLENBQUMsa0JBQU07O0FBRXpCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJEOlxcRU1KRSBwcm9qZWN0c1xcVGVsZVRyYXZhaWxcXFRlbGV3b3JraW5nLVRvb2xcXG5vZGVfbW9kdWxlc1xcandzXFxsaWJcXGRhdGEtc3RyZWFtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qZ2xvYmFsIG1vZHVsZSwgcHJvY2VzcyovXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXI7XG52YXIgU3RyZWFtID0gcmVxdWlyZSgnc3RyZWFtJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxuZnVuY3Rpb24gRGF0YVN0cmVhbShkYXRhKSB7XG4gIHRoaXMuYnVmZmVyID0gbnVsbDtcbiAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gIHRoaXMucmVhZGFibGUgPSB0cnVlO1xuXG4gIC8vIE5vIGlucHV0XG4gIGlmICghZGF0YSkge1xuICAgIHRoaXMuYnVmZmVyID0gQnVmZmVyLmFsbG9jKDApO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gU3RyZWFtXG4gIGlmICh0eXBlb2YgZGF0YS5waXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhpcy5idWZmZXIgPSBCdWZmZXIuYWxsb2MoMCk7XG4gICAgZGF0YS5waXBlKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gQnVmZmVyIG9yIFN0cmluZ1xuICAvLyBvciBPYmplY3QgKGFzc3VtZWRseSBhIHBhc3N3b3JkZWQga2V5KVxuICBpZiAoZGF0YS5sZW5ndGggfHwgdHlwZW9mIGRhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgdGhpcy5idWZmZXIgPSBkYXRhO1xuICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZW1pdCgnZW5kJywgZGF0YSk7XG4gICAgICB0aGlzLnJlYWRhYmxlID0gZmFsc2U7XG4gICAgICB0aGlzLmVtaXQoJ2Nsb3NlJyk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgZGF0YSB0eXBlICgnKyB0eXBlb2YgZGF0YSArICcpJyk7XG59XG51dGlsLmluaGVyaXRzKERhdGFTdHJlYW0sIFN0cmVhbSk7XG5cbkRhdGFTdHJlYW0ucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUoZGF0YSkge1xuICB0aGlzLmJ1ZmZlciA9IEJ1ZmZlci5jb25jYXQoW3RoaXMuYnVmZmVyLCBCdWZmZXIuZnJvbShkYXRhKV0pO1xuICB0aGlzLmVtaXQoJ2RhdGEnLCBkYXRhKTtcbn07XG5cbkRhdGFTdHJlYW0ucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uIGVuZChkYXRhKSB7XG4gIGlmIChkYXRhKVxuICAgIHRoaXMud3JpdGUoZGF0YSk7XG4gIHRoaXMuZW1pdCgnZW5kJywgZGF0YSk7XG4gIHRoaXMuZW1pdCgnY2xvc2UnKTtcbiAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICB0aGlzLnJlYWRhYmxlID0gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFTdHJlYW07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/jws/lib/data-stream.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/jws/lib/sign-stream.js":
/*!*********************************************!*\
  !*** ./node_modules/jws/lib/sign-stream.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*global module*/\nvar Buffer = (__webpack_require__(/*! safe-buffer */ \"(rsc)/./node_modules/safe-buffer/index.js\").Buffer);\nvar DataStream = __webpack_require__(/*! ./data-stream */ \"(rsc)/./node_modules/jws/lib/data-stream.js\");\nvar jwa = __webpack_require__(/*! jwa */ \"(rsc)/./node_modules/jwa/index.js\");\nvar Stream = __webpack_require__(/*! stream */ \"stream\");\nvar toString = __webpack_require__(/*! ./tostring */ \"(rsc)/./node_modules/jws/lib/tostring.js\");\nvar util = __webpack_require__(/*! util */ \"util\");\n\nfunction base64url(string, encoding) {\n  return Buffer\n    .from(string, encoding)\n    .toString('base64')\n    .replace(/=/g, '')\n    .replace(/\\+/g, '-')\n    .replace(/\\//g, '_');\n}\n\nfunction jwsSecuredInput(header, payload, encoding) {\n  encoding = encoding || 'utf8';\n  var encodedHeader = base64url(toString(header), 'binary');\n  var encodedPayload = base64url(toString(payload), encoding);\n  return util.format('%s.%s', encodedHeader, encodedPayload);\n}\n\nfunction jwsSign(opts) {\n  var header = opts.header;\n  var payload = opts.payload;\n  var secretOrKey = opts.secret || opts.privateKey;\n  var encoding = opts.encoding;\n  var algo = jwa(header.alg);\n  var securedInput = jwsSecuredInput(header, payload, encoding);\n  var signature = algo.sign(securedInput, secretOrKey);\n  return util.format('%s.%s', securedInput, signature);\n}\n\nfunction SignStream(opts) {\n  var secret = opts.secret||opts.privateKey||opts.key;\n  var secretStream = new DataStream(secret);\n  this.readable = true;\n  this.header = opts.header;\n  this.encoding = opts.encoding;\n  this.secret = this.privateKey = this.key = secretStream;\n  this.payload = new DataStream(opts.payload);\n  this.secret.once('close', function () {\n    if (!this.payload.writable && this.readable)\n      this.sign();\n  }.bind(this));\n\n  this.payload.once('close', function () {\n    if (!this.secret.writable && this.readable)\n      this.sign();\n  }.bind(this));\n}\nutil.inherits(SignStream, Stream);\n\nSignStream.prototype.sign = function sign() {\n  try {\n    var signature = jwsSign({\n      header: this.header,\n      payload: this.payload.buffer,\n      secret: this.secret.buffer,\n      encoding: this.encoding\n    });\n    this.emit('done', signature);\n    this.emit('data', signature);\n    this.emit('end');\n    this.readable = false;\n    return signature;\n  } catch (e) {\n    this.readable = false;\n    this.emit('error', e);\n    this.emit('close');\n  }\n};\n\nSignStream.sign = jwsSign;\n\nmodule.exports = SignStream;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvandzL2xpYi9zaWduLXN0cmVhbS5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBLGFBQWEsNEZBQTZCO0FBQzFDLGlCQUFpQixtQkFBTyxDQUFDLGtFQUFlO0FBQ3hDLFVBQVUsbUJBQU8sQ0FBQyw4Q0FBSztBQUN2QixhQUFhLG1CQUFPLENBQUMsc0JBQVE7QUFDN0IsZUFBZSxtQkFBTyxDQUFDLDREQUFZO0FBQ25DLFdBQVcsbUJBQU8sQ0FBQyxrQkFBTTs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBIiwic291cmNlcyI6WyJEOlxcRU1KRSBwcm9qZWN0c1xcVGVsZVRyYXZhaWxcXFRlbGV3b3JraW5nLVRvb2xcXG5vZGVfbW9kdWxlc1xcandzXFxsaWJcXHNpZ24tc3RyZWFtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qZ2xvYmFsIG1vZHVsZSovXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXI7XG52YXIgRGF0YVN0cmVhbSA9IHJlcXVpcmUoJy4vZGF0YS1zdHJlYW0nKTtcbnZhciBqd2EgPSByZXF1aXJlKCdqd2EnKTtcbnZhciBTdHJlYW0gPSByZXF1aXJlKCdzdHJlYW0nKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9zdHJpbmcnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG5mdW5jdGlvbiBiYXNlNjR1cmwoc3RyaW5nLCBlbmNvZGluZykge1xuICByZXR1cm4gQnVmZmVyXG4gICAgLmZyb20oc3RyaW5nLCBlbmNvZGluZylcbiAgICAudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gICAgLnJlcGxhY2UoLz0vZywgJycpXG4gICAgLnJlcGxhY2UoL1xcKy9nLCAnLScpXG4gICAgLnJlcGxhY2UoL1xcLy9nLCAnXycpO1xufVxuXG5mdW5jdGlvbiBqd3NTZWN1cmVkSW5wdXQoaGVhZGVyLCBwYXlsb2FkLCBlbmNvZGluZykge1xuICBlbmNvZGluZyA9IGVuY29kaW5nIHx8ICd1dGY4JztcbiAgdmFyIGVuY29kZWRIZWFkZXIgPSBiYXNlNjR1cmwodG9TdHJpbmcoaGVhZGVyKSwgJ2JpbmFyeScpO1xuICB2YXIgZW5jb2RlZFBheWxvYWQgPSBiYXNlNjR1cmwodG9TdHJpbmcocGF5bG9hZCksIGVuY29kaW5nKTtcbiAgcmV0dXJuIHV0aWwuZm9ybWF0KCclcy4lcycsIGVuY29kZWRIZWFkZXIsIGVuY29kZWRQYXlsb2FkKTtcbn1cblxuZnVuY3Rpb24gandzU2lnbihvcHRzKSB7XG4gIHZhciBoZWFkZXIgPSBvcHRzLmhlYWRlcjtcbiAgdmFyIHBheWxvYWQgPSBvcHRzLnBheWxvYWQ7XG4gIHZhciBzZWNyZXRPcktleSA9IG9wdHMuc2VjcmV0IHx8IG9wdHMucHJpdmF0ZUtleTtcbiAgdmFyIGVuY29kaW5nID0gb3B0cy5lbmNvZGluZztcbiAgdmFyIGFsZ28gPSBqd2EoaGVhZGVyLmFsZyk7XG4gIHZhciBzZWN1cmVkSW5wdXQgPSBqd3NTZWN1cmVkSW5wdXQoaGVhZGVyLCBwYXlsb2FkLCBlbmNvZGluZyk7XG4gIHZhciBzaWduYXR1cmUgPSBhbGdvLnNpZ24oc2VjdXJlZElucHV0LCBzZWNyZXRPcktleSk7XG4gIHJldHVybiB1dGlsLmZvcm1hdCgnJXMuJXMnLCBzZWN1cmVkSW5wdXQsIHNpZ25hdHVyZSk7XG59XG5cbmZ1bmN0aW9uIFNpZ25TdHJlYW0ob3B0cykge1xuICB2YXIgc2VjcmV0ID0gb3B0cy5zZWNyZXR8fG9wdHMucHJpdmF0ZUtleXx8b3B0cy5rZXk7XG4gIHZhciBzZWNyZXRTdHJlYW0gPSBuZXcgRGF0YVN0cmVhbShzZWNyZXQpO1xuICB0aGlzLnJlYWRhYmxlID0gdHJ1ZTtcbiAgdGhpcy5oZWFkZXIgPSBvcHRzLmhlYWRlcjtcbiAgdGhpcy5lbmNvZGluZyA9IG9wdHMuZW5jb2Rpbmc7XG4gIHRoaXMuc2VjcmV0ID0gdGhpcy5wcml2YXRlS2V5ID0gdGhpcy5rZXkgPSBzZWNyZXRTdHJlYW07XG4gIHRoaXMucGF5bG9hZCA9IG5ldyBEYXRhU3RyZWFtKG9wdHMucGF5bG9hZCk7XG4gIHRoaXMuc2VjcmV0Lm9uY2UoJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5wYXlsb2FkLndyaXRhYmxlICYmIHRoaXMucmVhZGFibGUpXG4gICAgICB0aGlzLnNpZ24oKTtcbiAgfS5iaW5kKHRoaXMpKTtcblxuICB0aGlzLnBheWxvYWQub25jZSgnY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnNlY3JldC53cml0YWJsZSAmJiB0aGlzLnJlYWRhYmxlKVxuICAgICAgdGhpcy5zaWduKCk7XG4gIH0uYmluZCh0aGlzKSk7XG59XG51dGlsLmluaGVyaXRzKFNpZ25TdHJlYW0sIFN0cmVhbSk7XG5cblNpZ25TdHJlYW0ucHJvdG90eXBlLnNpZ24gPSBmdW5jdGlvbiBzaWduKCkge1xuICB0cnkge1xuICAgIHZhciBzaWduYXR1cmUgPSBqd3NTaWduKHtcbiAgICAgIGhlYWRlcjogdGhpcy5oZWFkZXIsXG4gICAgICBwYXlsb2FkOiB0aGlzLnBheWxvYWQuYnVmZmVyLFxuICAgICAgc2VjcmV0OiB0aGlzLnNlY3JldC5idWZmZXIsXG4gICAgICBlbmNvZGluZzogdGhpcy5lbmNvZGluZ1xuICAgIH0pO1xuICAgIHRoaXMuZW1pdCgnZG9uZScsIHNpZ25hdHVyZSk7XG4gICAgdGhpcy5lbWl0KCdkYXRhJywgc2lnbmF0dXJlKTtcbiAgICB0aGlzLmVtaXQoJ2VuZCcpO1xuICAgIHRoaXMucmVhZGFibGUgPSBmYWxzZTtcbiAgICByZXR1cm4gc2lnbmF0dXJlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdGhpcy5yZWFkYWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlKTtcbiAgICB0aGlzLmVtaXQoJ2Nsb3NlJyk7XG4gIH1cbn07XG5cblNpZ25TdHJlYW0uc2lnbiA9IGp3c1NpZ247XG5cbm1vZHVsZS5leHBvcnRzID0gU2lnblN0cmVhbTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/jws/lib/sign-stream.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/jws/lib/tostring.js":
/*!******************************************!*\
  !*** ./node_modules/jws/lib/tostring.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*global module*/\nvar Buffer = (__webpack_require__(/*! buffer */ \"buffer\").Buffer);\n\nmodule.exports = function toString(obj) {\n  if (typeof obj === 'string')\n    return obj;\n  if (typeof obj === 'number' || Buffer.isBuffer(obj))\n    return obj.toString();\n  return JSON.stringify(obj);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvandzL2xpYi90b3N0cmluZy5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBLGFBQWEsb0RBQXdCOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiRDpcXEVNSkUgcHJvamVjdHNcXFRlbGVUcmF2YWlsXFxUZWxld29ya2luZy1Ub29sXFxub2RlX21vZHVsZXNcXGp3c1xcbGliXFx0b3N0cmluZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKmdsb2JhbCBtb2R1bGUqL1xudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpLkJ1ZmZlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0b1N0cmluZyhvYmopIHtcbiAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKVxuICAgIHJldHVybiBvYmo7XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCBCdWZmZXIuaXNCdWZmZXIob2JqKSlcbiAgICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/jws/lib/tostring.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/jws/lib/verify-stream.js":
/*!***********************************************!*\
  !*** ./node_modules/jws/lib/verify-stream.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*global module*/\nvar Buffer = (__webpack_require__(/*! safe-buffer */ \"(rsc)/./node_modules/safe-buffer/index.js\").Buffer);\nvar DataStream = __webpack_require__(/*! ./data-stream */ \"(rsc)/./node_modules/jws/lib/data-stream.js\");\nvar jwa = __webpack_require__(/*! jwa */ \"(rsc)/./node_modules/jwa/index.js\");\nvar Stream = __webpack_require__(/*! stream */ \"stream\");\nvar toString = __webpack_require__(/*! ./tostring */ \"(rsc)/./node_modules/jws/lib/tostring.js\");\nvar util = __webpack_require__(/*! util */ \"util\");\nvar JWS_REGEX = /^[a-zA-Z0-9\\-_]+?\\.[a-zA-Z0-9\\-_]+?\\.([a-zA-Z0-9\\-_]+)?$/;\n\nfunction isObject(thing) {\n  return Object.prototype.toString.call(thing) === '[object Object]';\n}\n\nfunction safeJsonParse(thing) {\n  if (isObject(thing))\n    return thing;\n  try { return JSON.parse(thing); }\n  catch (e) { return undefined; }\n}\n\nfunction headerFromJWS(jwsSig) {\n  var encodedHeader = jwsSig.split('.', 1)[0];\n  return safeJsonParse(Buffer.from(encodedHeader, 'base64').toString('binary'));\n}\n\nfunction securedInputFromJWS(jwsSig) {\n  return jwsSig.split('.', 2).join('.');\n}\n\nfunction signatureFromJWS(jwsSig) {\n  return jwsSig.split('.')[2];\n}\n\nfunction payloadFromJWS(jwsSig, encoding) {\n  encoding = encoding || 'utf8';\n  var payload = jwsSig.split('.')[1];\n  return Buffer.from(payload, 'base64').toString(encoding);\n}\n\nfunction isValidJws(string) {\n  return JWS_REGEX.test(string) && !!headerFromJWS(string);\n}\n\nfunction jwsVerify(jwsSig, algorithm, secretOrKey) {\n  if (!algorithm) {\n    var err = new Error(\"Missing algorithm parameter for jws.verify\");\n    err.code = \"MISSING_ALGORITHM\";\n    throw err;\n  }\n  jwsSig = toString(jwsSig);\n  var signature = signatureFromJWS(jwsSig);\n  var securedInput = securedInputFromJWS(jwsSig);\n  var algo = jwa(algorithm);\n  return algo.verify(securedInput, signature, secretOrKey);\n}\n\nfunction jwsDecode(jwsSig, opts) {\n  opts = opts || {};\n  jwsSig = toString(jwsSig);\n\n  if (!isValidJws(jwsSig))\n    return null;\n\n  var header = headerFromJWS(jwsSig);\n\n  if (!header)\n    return null;\n\n  var payload = payloadFromJWS(jwsSig);\n  if (header.typ === 'JWT' || opts.json)\n    payload = JSON.parse(payload, opts.encoding);\n\n  return {\n    header: header,\n    payload: payload,\n    signature: signatureFromJWS(jwsSig)\n  };\n}\n\nfunction VerifyStream(opts) {\n  opts = opts || {};\n  var secretOrKey = opts.secret||opts.publicKey||opts.key;\n  var secretStream = new DataStream(secretOrKey);\n  this.readable = true;\n  this.algorithm = opts.algorithm;\n  this.encoding = opts.encoding;\n  this.secret = this.publicKey = this.key = secretStream;\n  this.signature = new DataStream(opts.signature);\n  this.secret.once('close', function () {\n    if (!this.signature.writable && this.readable)\n      this.verify();\n  }.bind(this));\n\n  this.signature.once('close', function () {\n    if (!this.secret.writable && this.readable)\n      this.verify();\n  }.bind(this));\n}\nutil.inherits(VerifyStream, Stream);\nVerifyStream.prototype.verify = function verify() {\n  try {\n    var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);\n    var obj = jwsDecode(this.signature.buffer, this.encoding);\n    this.emit('done', valid, obj);\n    this.emit('data', valid);\n    this.emit('end');\n    this.readable = false;\n    return valid;\n  } catch (e) {\n    this.readable = false;\n    this.emit('error', e);\n    this.emit('close');\n  }\n};\n\nVerifyStream.decode = jwsDecode;\nVerifyStream.isValid = isValidJws;\nVerifyStream.verify = jwsVerify;\n\nmodule.exports = VerifyStream;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvandzL2xpYi92ZXJpZnktc3RyZWFtLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsYUFBYSw0RkFBNkI7QUFDMUMsaUJBQWlCLG1CQUFPLENBQUMsa0VBQWU7QUFDeEMsVUFBVSxtQkFBTyxDQUFDLDhDQUFLO0FBQ3ZCLGFBQWEsbUJBQU8sQ0FBQyxzQkFBUTtBQUM3QixlQUFlLG1CQUFPLENBQUMsNERBQVk7QUFDbkMsV0FBVyxtQkFBTyxDQUFDLGtCQUFNO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJEOlxcRU1KRSBwcm9qZWN0c1xcVGVsZVRyYXZhaWxcXFRlbGV3b3JraW5nLVRvb2xcXG5vZGVfbW9kdWxlc1xcandzXFxsaWJcXHZlcmlmeS1zdHJlYW0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypnbG9iYWwgbW9kdWxlKi9cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlcjtcbnZhciBEYXRhU3RyZWFtID0gcmVxdWlyZSgnLi9kYXRhLXN0cmVhbScpO1xudmFyIGp3YSA9IHJlcXVpcmUoJ2p3YScpO1xudmFyIFN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi90b3N0cmluZycpO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG52YXIgSldTX1JFR0VYID0gL15bYS16QS1aMC05XFwtX10rP1xcLlthLXpBLVowLTlcXC1fXSs/XFwuKFthLXpBLVowLTlcXC1fXSspPyQvO1xuXG5mdW5jdGlvbiBpc09iamVjdCh0aGluZykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaW5nKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59XG5cbmZ1bmN0aW9uIHNhZmVKc29uUGFyc2UodGhpbmcpIHtcbiAgaWYgKGlzT2JqZWN0KHRoaW5nKSlcbiAgICByZXR1cm4gdGhpbmc7XG4gIHRyeSB7IHJldHVybiBKU09OLnBhcnNlKHRoaW5nKTsgfVxuICBjYXRjaCAoZSkgeyByZXR1cm4gdW5kZWZpbmVkOyB9XG59XG5cbmZ1bmN0aW9uIGhlYWRlckZyb21KV1MoandzU2lnKSB7XG4gIHZhciBlbmNvZGVkSGVhZGVyID0gandzU2lnLnNwbGl0KCcuJywgMSlbMF07XG4gIHJldHVybiBzYWZlSnNvblBhcnNlKEJ1ZmZlci5mcm9tKGVuY29kZWRIZWFkZXIsICdiYXNlNjQnKS50b1N0cmluZygnYmluYXJ5JykpO1xufVxuXG5mdW5jdGlvbiBzZWN1cmVkSW5wdXRGcm9tSldTKGp3c1NpZykge1xuICByZXR1cm4gandzU2lnLnNwbGl0KCcuJywgMikuam9pbignLicpO1xufVxuXG5mdW5jdGlvbiBzaWduYXR1cmVGcm9tSldTKGp3c1NpZykge1xuICByZXR1cm4gandzU2lnLnNwbGl0KCcuJylbMl07XG59XG5cbmZ1bmN0aW9uIHBheWxvYWRGcm9tSldTKGp3c1NpZywgZW5jb2RpbmcpIHtcbiAgZW5jb2RpbmcgPSBlbmNvZGluZyB8fCAndXRmOCc7XG4gIHZhciBwYXlsb2FkID0gandzU2lnLnNwbGl0KCcuJylbMV07XG4gIHJldHVybiBCdWZmZXIuZnJvbShwYXlsb2FkLCAnYmFzZTY0JykudG9TdHJpbmcoZW5jb2RpbmcpO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkSndzKHN0cmluZykge1xuICByZXR1cm4gSldTX1JFR0VYLnRlc3Qoc3RyaW5nKSAmJiAhIWhlYWRlckZyb21KV1Moc3RyaW5nKTtcbn1cblxuZnVuY3Rpb24gandzVmVyaWZ5KGp3c1NpZywgYWxnb3JpdGhtLCBzZWNyZXRPcktleSkge1xuICBpZiAoIWFsZ29yaXRobSkge1xuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoXCJNaXNzaW5nIGFsZ29yaXRobSBwYXJhbWV0ZXIgZm9yIGp3cy52ZXJpZnlcIik7XG4gICAgZXJyLmNvZGUgPSBcIk1JU1NJTkdfQUxHT1JJVEhNXCI7XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIGp3c1NpZyA9IHRvU3RyaW5nKGp3c1NpZyk7XG4gIHZhciBzaWduYXR1cmUgPSBzaWduYXR1cmVGcm9tSldTKGp3c1NpZyk7XG4gIHZhciBzZWN1cmVkSW5wdXQgPSBzZWN1cmVkSW5wdXRGcm9tSldTKGp3c1NpZyk7XG4gIHZhciBhbGdvID0gandhKGFsZ29yaXRobSk7XG4gIHJldHVybiBhbGdvLnZlcmlmeShzZWN1cmVkSW5wdXQsIHNpZ25hdHVyZSwgc2VjcmV0T3JLZXkpO1xufVxuXG5mdW5jdGlvbiBqd3NEZWNvZGUoandzU2lnLCBvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuICBqd3NTaWcgPSB0b1N0cmluZyhqd3NTaWcpO1xuXG4gIGlmICghaXNWYWxpZEp3cyhqd3NTaWcpKVxuICAgIHJldHVybiBudWxsO1xuXG4gIHZhciBoZWFkZXIgPSBoZWFkZXJGcm9tSldTKGp3c1NpZyk7XG5cbiAgaWYgKCFoZWFkZXIpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgdmFyIHBheWxvYWQgPSBwYXlsb2FkRnJvbUpXUyhqd3NTaWcpO1xuICBpZiAoaGVhZGVyLnR5cCA9PT0gJ0pXVCcgfHwgb3B0cy5qc29uKVxuICAgIHBheWxvYWQgPSBKU09OLnBhcnNlKHBheWxvYWQsIG9wdHMuZW5jb2RpbmcpO1xuXG4gIHJldHVybiB7XG4gICAgaGVhZGVyOiBoZWFkZXIsXG4gICAgcGF5bG9hZDogcGF5bG9hZCxcbiAgICBzaWduYXR1cmU6IHNpZ25hdHVyZUZyb21KV1MoandzU2lnKVxuICB9O1xufVxuXG5mdW5jdGlvbiBWZXJpZnlTdHJlYW0ob3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgdmFyIHNlY3JldE9yS2V5ID0gb3B0cy5zZWNyZXR8fG9wdHMucHVibGljS2V5fHxvcHRzLmtleTtcbiAgdmFyIHNlY3JldFN0cmVhbSA9IG5ldyBEYXRhU3RyZWFtKHNlY3JldE9yS2V5KTtcbiAgdGhpcy5yZWFkYWJsZSA9IHRydWU7XG4gIHRoaXMuYWxnb3JpdGhtID0gb3B0cy5hbGdvcml0aG07XG4gIHRoaXMuZW5jb2RpbmcgPSBvcHRzLmVuY29kaW5nO1xuICB0aGlzLnNlY3JldCA9IHRoaXMucHVibGljS2V5ID0gdGhpcy5rZXkgPSBzZWNyZXRTdHJlYW07XG4gIHRoaXMuc2lnbmF0dXJlID0gbmV3IERhdGFTdHJlYW0ob3B0cy5zaWduYXR1cmUpO1xuICB0aGlzLnNlY3JldC5vbmNlKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuc2lnbmF0dXJlLndyaXRhYmxlICYmIHRoaXMucmVhZGFibGUpXG4gICAgICB0aGlzLnZlcmlmeSgpO1xuICB9LmJpbmQodGhpcykpO1xuXG4gIHRoaXMuc2lnbmF0dXJlLm9uY2UoJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5zZWNyZXQud3JpdGFibGUgJiYgdGhpcy5yZWFkYWJsZSlcbiAgICAgIHRoaXMudmVyaWZ5KCk7XG4gIH0uYmluZCh0aGlzKSk7XG59XG51dGlsLmluaGVyaXRzKFZlcmlmeVN0cmVhbSwgU3RyZWFtKTtcblZlcmlmeVN0cmVhbS5wcm90b3R5cGUudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KCkge1xuICB0cnkge1xuICAgIHZhciB2YWxpZCA9IGp3c1ZlcmlmeSh0aGlzLnNpZ25hdHVyZS5idWZmZXIsIHRoaXMuYWxnb3JpdGhtLCB0aGlzLmtleS5idWZmZXIpO1xuICAgIHZhciBvYmogPSBqd3NEZWNvZGUodGhpcy5zaWduYXR1cmUuYnVmZmVyLCB0aGlzLmVuY29kaW5nKTtcbiAgICB0aGlzLmVtaXQoJ2RvbmUnLCB2YWxpZCwgb2JqKTtcbiAgICB0aGlzLmVtaXQoJ2RhdGEnLCB2YWxpZCk7XG4gICAgdGhpcy5lbWl0KCdlbmQnKTtcbiAgICB0aGlzLnJlYWRhYmxlID0gZmFsc2U7XG4gICAgcmV0dXJuIHZhbGlkO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdGhpcy5yZWFkYWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlKTtcbiAgICB0aGlzLmVtaXQoJ2Nsb3NlJyk7XG4gIH1cbn07XG5cblZlcmlmeVN0cmVhbS5kZWNvZGUgPSBqd3NEZWNvZGU7XG5WZXJpZnlTdHJlYW0uaXNWYWxpZCA9IGlzVmFsaWRKd3M7XG5WZXJpZnlTdHJlYW0udmVyaWZ5ID0gandzVmVyaWZ5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZlcmlmeVN0cmVhbTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/jws/lib/verify-stream.js\n");

/***/ })

};
;