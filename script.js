document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            let input = inputField.value;
            inputField.value = "";
            output(input);
        }
    });
});

function checktime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
let username = "";
function output(input) {
    let product;
    let text = input.trim().toLowerCase();
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    m = checktime(m);
    s = checktime(s);

    if (compare(prompts, replies, text)) {
        product = compare(prompts, replies, text);
    } else if (text.match(/(time|mấy giờ)/gi)) {
        product = h + ":" + m + ":" + s;
    } else if (text.match(/(Tôi buồn|play game)/gi)) {
        product = "Cùng chơi trò chơi nhé";
        setTimeout(function () {
            window.open("/Dự Án Cá Nhân/Dự án Gaming II/index.html");
        }, 2500);
    } else if (text.match(/(dự án|workstation)/gi)) {
        setTimeout(function () {
            window.open("/CaseStudy2/html/index.html");
        }, 2500);
        product = "Just wait a minutes";
    } else if (text.match(/(quản lý|admin)/gi)) {
        setTimeout(function () {
            window.open("/CaseStudy2/html/admin_tk.html");
        }, 2500);
        product = "As you wish";
    } else if (text.match(/(phước thế nào)/gi)) {
        product = phuocS[Math.floor(Math.random() * phuocS.length)];
    } else if (text.match(/(thời tiết|nhiệt độ)/gi)) {
        weatherCheck(text);
        return false;
    } else if (text.match(/(kế hoạch|nhắc tôi)/gi)) {
        text = text
            .replace(/nhắc nhở tôi /g, "")
            .replace(/kế hoạch /g, "")
            .replace(/ nhé/g, "");
        Plan.push(text);
        product = "Đã thêm vào kế hoạch ";
    } else if (text.match(/(tôi phải làm gì)/gi)) {
        toDoList();
        product = "Đây là danh sách việc cần làm  ->";
    } else if (text.match(/(muốn nghe nhạc|play some music)/gi)) {
        musicPlay();
        product = "Nhấn nút play để nghe nhé ^^";
    } else if (text.match(/(dừng nhạc|stop music)/gi)) {
        stopMusic();
        product = "Đã dừng nhạc, chúc bạn vui vẻ !";
    } else if (text.match(/(muốn xem phim|play some film)/gi)) {
        displayFilm();
        product = "Xem phim vui vẻ nhé ^^";
    } else if (text.match(/(tìm kiếm google|google)/gi)) {
        text = text.replace(/tìm kiếm google /g, "").replace(/google /g, "");
        seachGoogle(text);
        product = "Đợi 1 chút nhé";
    } else if (text.match(/(my name is|tôi tên là)/gi)) {
        text = text.replace(/my name is /g, "").replace(/tôi tên là /g, "");
        username = text;
        product = "Xin chào " + username;
        console.log(username);
    } else if (text.match(/(tên của tôi)/gi)) {
        if (username == "") {
            product = "Bạn chưa nói cho tôi tên của bạn";
        } else {
            product = "Tên của bạn là " + username;
        }
    } else {
        product = alternative[Math.floor(Math.random() * alternative.length)];
    }
    addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
        for (let y = 0; y < promptsArray[x].length; y++) {
            if (promptsArray[x][y] === string) {
                let replies = repliesArray[x];
                reply = replies[Math.floor(Math.random() * replies.length)];
                replyFound = true;
                break;
            }
        }
        if (replyFound) {
            break;
        }
    }
    return reply;
}
function addChat(input, product) {
    const messagesContainer = document.getElementById("messages");

    let userDiv = document.createElement("div");
    userDiv.id = "user";
    // userDiv.className = "user response";
    userDiv.innerHTML = `
    <div class="chatbox__messages">
                    <div class="chatbox__messages__user-message">
                        <div class="chatbox__messages__user-message--ind-message">
                            <p class="name ng-binding">${input}</p>
                        </div>
                    </div>
                </div>
    `;
    messagesContainer.appendChild(userDiv);

    let botDiv = document.createElement("div");
    // let botText = document.createElement("span");
    botDiv.id = "bot";
    botDiv.className = "chatbox__messages";
    botDiv.innerHTML = `
  
                    <div class="chatbox__messages__user-message">
                        <div class="chatbox__messages__user-message--ind-message">
                            <p class="name ng-binding">${product}</p>
                        </div>
                    </div>

    `;
    messagesContainer.scrollTop =
        messagesContainer.scrollHeight - messagesContainer.clientHeight;

    setTimeout(() => {
        messagesContainer.appendChild(botDiv);
        textToSpeech(product);
    }, 1500);
}

//
document.onkeyup = checkKey;
function checkKey(e) {
    if (e.keyCode == "106") {
        regStart();
    }
}

function weatherCheck(input) {
    let product = "";
    let api_url =
        "https://api.openweathermap.org/data/2.5/weather?q=saigon&appid=ff532977349290d86ac2bc3243a8ca5a";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", api_url, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let ketqua = JSON.parse(xhttp.responseText);
            console.log(ketqua.main);
            let temp = parseInt(ketqua.main.temp - 273);
            let feelslike = parseInt(ketqua.main.feels_like - 273);
            product =
                "Nhiệt độ hôm nay : " +
                temp +
                "°" +
                " và có cảm giác như : " +
                feelslike +
                "°";
            addChat(input, product);
        }
    };
}

//Module nhắc nhở

// function toDoList() {
//     let a = document.getElementById("todolist-f");
//     a.innerHTML = "";
//     let temp =
//         '<div id="todolist-s"><table style="padding-top:25px;padding-left:20px"><tbody id="todolist-ss">';

//     for (i = 0; i < Plan.length; i++) {
//         temp +=
//             `<tr><td class="todoliststt">${i + 1}.</td>` +
//             '<td class="todolistcheck">' +
//             Plan[i] +
//             "</td>" +
//             `<td><button style="background-color:lightgreen" class="ui button" onclick="deletedList(${i})">Xong</button></td></tr>`;
//     }
//     temp += "</tbody></table></div>";
//     a.innerHTML = temp;
//     setTimeout(function () {
//         document.getElementById("todolist-f").innerHTML = "";
//     }, 8000);
// }
// function deletedList(i) {
//     Plan.splice(i, 1);
//     let a = document.getElementById("todolist-ss");
//     let temp = "";

//     for (i = 0; i < Plan.length; i++) {
//         temp +=
//             `<tr><td class="todoliststt">${i + 1}</td>` +
//             '<td class="todolistcheck">' +
//             Plan[i] +
//             "</td>" +
//             `<td><button style="background-color:lightgreen" class="ui button" onclick="deletedList(${i})">Xong</button></td></tr>`;
//     }
//     a.innerHTML = temp;
// }

// // Module Âm nhạc
// const musicPlaylist = [
//     "/Dự Án Cá Nhân/SourceSound/IU1.mp3",
//     "/Dự Án Cá Nhân/SourceSound/IU2.mp3",
//     "/Dự Án Cá Nhân/SourceSound/IU3.mp3",
//     "/Dự Án Cá Nhân/SourceSound/IU4.mp3",
// ];
// let music = new Audio();
// function musicPlay() {
//     let a = document.getElementById("todolist-f");
//     let temp =
//         '<div id="musiclist"><div style="padding-left: 20px;padding-top: 30px;" class="ui vertical labeled icon buttons"><button class="ui button" onclick="playMusic()"><i class="play icon"></i>Play</button><button class="ui button" onclick="stopMusic()"><i class="stop circle icon"></i>Stop</button></div></div>';
//     a.innerHTML = temp;
// }

// function playMusic() {
//     music.src = musicPlaylist[Math.floor(Math.random() * musicPlaylist.length)];
//     music.play();
// }
// function stopMusic() {
//     music.pause();
//     document.getElementById("todolist-f").innerHTML = "";
// }
// // Module Film
// const filmSource = [
//     "../SourceSound/VIDIU1.mp4",
//     "../SourceSound/VIDIU2.mp4",
//     "../SourceSound/VID3.mp4",
//     "../SourceSound/VID4.mp4",
// ];

// let temp = 0;
// function displayFilm() {
//     let a = document.getElementById("todolist-f");
//     a.innerHTML = `<div id="tivi"><video controls autoplay style=" width: 400px; padding-top: 12px; border-radius: 10px; padding-left: 8px;"><source id="monitor" src=${filmSource[temp]
//         } />  </video>  <button    class="ui labeled icon button"    style="margin-left: 20px; margin-top: 20px" onclick="changeFilm(${-1})"><i class="left arrow icon"></i>Previous</button><button class="ui button" onclick="deletedFilm()"><i class="stop icon"></i>Close</button><button class="ui right labeled icon button" onclick="changeFilm(${1})"><i class="right arrow icon"></i>Next</button></div>`;
// }

// function changeFilm(x) {
//     let a = document.getElementById("monitor");
//     temp = temp + x;
//     if (temp >= 0 && temp < filmSource.length) {
//         a.src = filmSource[temp];
//     } else {
//         alert("Hết kênh rồi đừng bấm nữa T_T");
//         temp = temp - x;
//         return false;
//     }
//     console.log(temp);
//     displayFilm();
// }
// function deletedFilm() {
//     let a = document.getElementById("todolist-f");
//     a.innerHTML = "";
// }

//Module seach Google

function seachGoogle(x) {
    x = x.split(" ");
    let temp = "https://www.google.com.vn/search?q=";
    for (i = 0; i < x.length; i++) {
        temp += x[i] + "+";
    }
    console.log(temp);
    setTimeout(function () {
        window.open(temp);
    }, 3000);
}
