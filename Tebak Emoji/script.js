const questions = [
    { emoji: "👧📅7️⃣🕯️", answer: "vina: sebelum 7 hari", hint: "Berdasarkan kisah nyata gadis asal Cirebon yang misterius sebelum 7 hari kematiannya." },
    { emoji: "👨‍👧‍👦7️⃣🏠", answer: "1 kakak 7 ponakan", hint: "Kakak tunggal yang harus mengasuh 7 keponakan sekaligus." },
    { emoji: "⏳💔🧑‍🎓", answer: "mungkin kita perlu waktu", hint: "Film romantis tentang perjalanan cinta dan waktu yang menyembuhkan luka." },
    { emoji: "👑👧🌍❤️", answer: "the most beautiful girl in the world", hint: "Cinta pertama pada gadis paling cantik di dunia." },
    { emoji: "🏫🔒🔥", answer: "pengepungan di bukit duri", hint: "Kisah perjuangan dan konflik di sebuah pemukiman urban." },
    { emoji: "👦🎨🎬", answer: "jumbo", hint: "seorang anak laki-laki yang sering diolok karena tubuhnya yang besar, yang berjuang untuk membuktikan dirinya melalui pertunjukan seni yang terinspirasi dari buku dongeng peninggalan orang tuanya ." },
    { emoji: "🦋📄💔", answer: "kupu-kupu kertas", hint: "Kisah cinta dan kehilangan yang puitis." },
    { emoji: "👩‍❤️‍👨📅1995🛵", answer: "ancika: dia yang bersamaku 1995", hint: "Cinta remaja di era 90-an yang penuh kenangan." },
    { emoji: "🏠🍰👨‍👩‍👧‍👦", answer: "home sweet home", hint: "Film keluarga yang hangat tentang arti rumah sesungguhnya." },
    { emoji: "💰💍💑", answer: "uang panai 2", hint: "Kisah lanjutan tentang biaya pernikahan dalam budaya Bugis." },
    { emoji: "⚰️🔥😱", answer: "azab", hint: "Cerita moral penuh azab dan balasan bagi orang zalim." },
    { emoji: "😂👻🎭", answer: "agak laen", hint: "Film komedi horor tentang kelompok pelawak dan arwah penasaran." },
    { emoji: "🧑‍🤝‍🧑💔", answer: "ipar adalah maut", hint: "drama perselingkuhan yang mengganggu pernikahan." },
    { emoji: "💔😕🎭", answer: "setengah hati", hint: "Tentang cinta yang tak pernah benar-benar utuh." },
    { emoji: "🏨✂️😱", answer: "hairbreak motel", hint: "Motel misterius yang menyimpan rahasia menyeramkan." },
    { emoji: "👻💼🏢", answer: "rasuk dinas boyok", hint: "Kantor biasa jadi angker karena makhluk tak kasat mata." },
    { emoji: "👨‍🏫👻🏫", answer: "dosen gaib", hint: "Kisah horor tentang dosen misterius yang menghantui kampus." },
    { emoji: "📷🛫🇸🇦", answer: "syirik", hint: "Horor spiritual saat perjalanan religi berubah menakutkan." },
    { emoji: "🧟‍♂️🪓🕌", answer: "hari kiamat sudah dekat", hint: "Zombi, kiamat, dan perjuangan iman." },
];

let currentIndex = 0;
let score = 0;
let shuffledQuestions = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomOptions(correctAnswer) {
  let options = [correctAnswer];
  while (options.length < 4) {
    let rand = questions[Math.floor(Math.random() * questions.length)].answer;
    if (!options.includes(rand)) options.push(rand);
  }
  return shuffle(options);
}

function showQuestion(index) {
  const q = shuffledQuestions[index];
  $("#emoji-display").text(q.emoji);
  $("#hint").text(`Petunjuk: ${q.hint}`);
  $("#result").text("");
  $("#score").text(`Skor: ${score} / ${index}`);

  const options = getRandomOptions(q.answer);
  $("#options").empty();
  options.forEach(opt => {
    $("#options").append(`<button class="option-btn">${opt}</button>`);
  });
}

$(document).ready(function () {
  const lastScore = localStorage.getItem("lastScore") || 0;
  $("#last-score").text(`Skor Terakhir: ${lastScore}`);

  $("#start-btn").click(function () {
    $("#start-screen").hide();
    $("#game").show();
    shuffledQuestions = shuffle([...questions]);
    showQuestion(currentIndex);
  });

  $("#options").on("click", ".option-btn", function () {
    const selected = $(this).text().toLowerCase().trim();
    const correct = shuffledQuestions[currentIndex].answer;

    if (selected === correct) {
      $("#result").text("✅ Benar!").css("color", "green");
      score++;
    } else {
      $("#result").text(`❌ Salah! Jawaban: ${correct}`).css("color", "red");
    }

    $(".option-btn").prop("disabled", true);
    $("#score").text(`Skor: ${score} / ${currentIndex + 1}`);
  });

  $("#next").click(function () {
    currentIndex++;
    if (currentIndex >= shuffledQuestions.length) {
      localStorage.setItem("lastScore", score);
      alert(`Permainan selesai!\nSkor kamu: ${score} dari ${shuffledQuestions.length}`);
      currentIndex = 0;
      score = 0;
      shuffledQuestions = shuffle([...questions]);
    }
    showQuestion(currentIndex);
  });
});
  