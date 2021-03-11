    //0番目：問題、1〜4番目：選択肢、5番目：正解の番号
  　//配列は　[]　でくくる
  　//文字は "" の中に書く、数字は "" 不要
  　//要素と要素の間に , を入れる
let quiz1 = [
    ["搬家", "引っ越す", "家に帰る", "参加する", "悲しむ", 1],
    ["冰箱", "げた箱", "冷蔵庫", "薬", "いす", 2],
    ["参加", "まじわる", "加算する", "参加する", "降参する", 3],
    ["餐桌", "愛", "食べる", "食卓", "驚く", 3],
    ["吃惊", "くじら", "驚く", "食べる", "感じる", 2],
    ["出差", "出張する", "引き算", "遊びに行く", "出かける", 1],
    ["出发", "出る", "運転する", "発車する", "出発する", 4],
    ["出生", "生まれる", "生活する", "出身", "生である", 1],
    ["担心", "心", "担う", "心配する", "志す", 3],
    ["发生", "反発する", "発生する", "生である", "主張する", 2]
];
let quiz2=[]
//問題を順番に表示させるためのカウンター
let i=0
let quiz=[]
let order = 0;
let correct = 0;
let msg = new SpeechSynthesisUtterance();
msg.lang = 'zh-CH';
let pingpong = new Audio("pingpong.mp3")
let tigau = new Audio("tigau.mp3")
let resultmp3 = new Audio("result.mp3")
let interval
function set(){
    if(document.getElementById("stage").value==1){
        quiz=quiz1;
    }
    let orderArea = document.getElementById("order");
    let question = document.getElementById("question");
    let answer1 = document.getElementById("answer1");
    let answer2 = document.getElementById("answer2");
    let answer3 = document.getElementById("answer3");
    let answer4 = document.getElementById("answer4");
    
    orderArea.innerHTML = "【第" + (order + 1) + "問】";
    question.innerHTML = quiz[order][0];
    answer1.innerHTML = quiz[order][1];
    answer2.innerHTML = quiz[order][2];
    answer3.innerHTML = quiz[order][3];
    answer4.innerHTML = quiz[order][4];
    msg.text = quiz[order][0]; 
    window.speechSynthesis.speak(msg);    
    document.getElementById("selectmode").style.display="none";
    interval = window.setInterval(inter, 100);
}
function inter(){
    document.getElementById("quizprogress").value = 30 - i
    if(i>=30){
        judge(5);
    }
    i++
}
function judge(num){
    i=0
    clearInterval(interval);
    let result = document.getElementById("result");
    let answer = quiz[order][5];
    if(answer == num){
      correct += 1;
      result.innerHTML = "正解！";
      pingpong.play()
    }
    else{
      result.innerHTML = "不正解...";
      tigau.play()
    }
    order += 1;
    if(order == quiz.length){
        result.innerHTML += 
        "<br>" + quiz.length + "問中" + correct + "問正解！";
        resultmp3.play()
        let rank= ""
        if((100 / quiz.length * correct) >= 100){
            rank="RANK S"
        }else if((100 / quiz.length * correct) > 80){
            rank="RANK A"
        }else if((100 / quiz.length * correct) > 60){
            rank="RANK B"
        }else if((100 / quiz.length * correct) > 40){
            rank="RANK C"
        }else if((100 / quiz.length * correct) > 20){
            rank="RANK D"
        }else if((100 / quiz.length * correct) >= 0){
            rank="RANK E"
        }
        result.innerHTML += "あなたは "+rank+"！"
        document.getElementById("selectmode").style.display="inline-block";
    }
    else{
        set();
    }
}