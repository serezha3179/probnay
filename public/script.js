
// async function myFunction() {
//     let res = await fetch('http://localhost:9000/', {
//         method: "GET",
//     })
//     let a = await res.text()
//     console.log(a)
//     let div = document.createElement("div")
//     div.innerHTML = a
//     document.body.append(div)
// }
// myFunction();


const FEEDBACK_FORM = document.querySelector("#feedback-form");

async function sendFeedback(feedback) {
  await fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedback),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Форма успешно отправлена!");
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    });
}

FEEDBACK_FORM.addEventListener("submit", (e) => {
  e.preventDefault();

  const feedbackFormData = new FormData(e.target);
  // console.log("feedbackFormData",feedbackFormData);
  const feedback = Object.fromEntries(feedbackFormData);
  // console.log("feedback",feedback);

  sendFeedback(feedback);
});