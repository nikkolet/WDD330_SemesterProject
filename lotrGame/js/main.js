const file = "json/fotrQuestions.json";

async function getText(file) {
    let myObject = await fetch(file);
    let myText = await myObject.text();
    myDisplay(myText);
    console.log(myText);
}