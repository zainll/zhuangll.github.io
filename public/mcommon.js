function decryptAES() {
    var pass = String(document.getElementById("pass").value);
    try {
        var content = CryptoJS.AES.decrypt(document.getElementById("encrypt-blog").innerHTML.trim(), pass);
        content = content.toString(CryptoJS.enc.Utf8);
        content = decodeBase64(content);
        console.log(content);
        content = unescape(content);
        if (content == '') {
            alert("密码错误！！");
        } else {
            document.getElementById("encrypt-blog").style.display    = "inline";
            document.getElementById("encrypt-blog").innerHTML        = content;

            document.getElementById("security").style.display        = "none";

            if (document.getElementById("toc-div")) {
                document.getElementById("toc-div").style.display     = "inline";
            }
        }
    } catch (e) {
        alert("密码错误！！");
        console.log(e);
    }
}

function htmlDecode (str) {
    var s = "";
    if (str.length == 0) return "";

    s = str.replace(/&gt;/g, "&amp;");
    s = s.replace(/&lt;/g,   "&lt;");
    s = s.replace(/&gt;/g,   "&gt;");
    s = s.replace(/&nbsp;/g, "    ");
    s = s.replace(/'/g,      "\'");
    s = s.replace(/"/g, "\"");
    s = s.replace(/<br>/g,   "\n");
    return s;
}

function decodeBase64(content) {
    content = CryptoJS.enc.Base64.parse(content);
    content = CryptoJS.enc.Utf8.stringify(content);
    return content;
}


// add enter to decrypt
addLoadEvent(function() {
    console.log('register');
    document.getElementById("pass").onkeypress = function(keyPressEvent) {
        console.log(keyPressEvent.keyCode === 13);
        if (keyPressEvent.keyCode === 13) {
            decryptAES();
        }
    };
});

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}
<script type="text&#x2F;javascript" src="https://cdn.jsdelivr.net/npm/kity@2.0.4/dist/kity.min.js"></script><script type="text&#x2F;javascript" src="https://cdn.jsdelivr.net/npm/kityminder-core@1.4.50/dist/kityminder.core.min.js"></script><script defer="true" type="text&#x2F;javascript" src="https://cdn.jsdelivr.net/npm/hexo-simple-mindmap@0.7.0/dist/mindmap.min.js"></script><link rel="stylesheet" type="text&#x2F;css" href="https://cdn.jsdelivr.net/npm/hexo-simple-mindmap@0.7.0/dist/mindmap.min.css">