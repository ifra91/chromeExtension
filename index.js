let myLeads = [];
let oldLeads = [];
const inputEL = document.getElementById("input-el");
let inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el")

const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
        let url = tabs[0].url;
        myLeads.push(url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})

//render the leads to an unordered list
function render(leads) {
    let listItems = "";
    for (let i = 0; i <= leads.length - 1; i++) {
        console.log(leads[i]);
        listItems += `
        <li>
        <a target ='_blank' href="${leads[i]}">${leads[i]}</a>
        </li>`;
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function() {
    console.log("double clicked");
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEL.value);
    inputEL.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
})