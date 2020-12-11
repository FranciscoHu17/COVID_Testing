var i = 1;
var checkboxHolder = [];
var inputHolder = [];
function addtoTable() {
	var table = document.getElementById("table");
	var checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.id = "check" + i;
	checkboxHolder.push(i);
	var row = document.createElement("tr");
	var cell1 = document.createElement("td");
	var cell2 = document.createElement("td");
	var cell3 = document.createElement("td");
	cell2.innerHTML = document.getElementById("input1").value;

	var inputs1 = document.getElementsByTagName("input");
	for (var index = 0; index < inputs.length; ++index) {
		cell3.innerHTML = cell3.innerHTML + inputs1[index].value;
	}
	cell1.append(checkbox);
	row.appendChild(cell1);
	row.appendChild(cell2);
	row.appendChild(cell3);
	table.appendChild(row);
	i++;
	/*var row = table.insertRow(); //can also do table.rows.length
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = document.getElementById("input1").value;
        cell2.innerHTML = document.getElementById("input2").value;*/
}

function deleteF() {
	var table = document.getElementById("table");
	if (table.rows.length <= 1) {
		return;
	}
	var bruh = []; //position holder
	for (var k = 1; k <= checkboxHolder.length; k++) {
		bruh.push(k);
	}
	for (var i = 0; i < checkboxHolder.length; i++) {
		if (document.getElementById("check" + checkboxHolder[i]).checked) {
			//actual checkbox array itself

			table.deleteRow(bruh[i]);
			for (a = i + 1; a < bruh.length; a++) {
				bruh[a]--;
			}
			bruh.splice(i, 1);
			//var j = checkboxHolder.indexOf(i);
			checkboxHolder.splice(i, 1);
		}
	}
}

function deleteTbar(id) {
	var idNum = id.charAt(id.length - 1);
	var inputs = document.getElementsByTagName("input");
	//  while (inputs.length) inputs[0].parentNode.removeChild(inputs[0]);
	var bruhinput = []; //position holder
	for (var k = 1; k <= deleteHolder.length; k++) {
		bruhinput.push(k);
	}
	var j = deleteHolder.indexOf(i);
	inputs[0].parentNode.removeChild(inputs[j]);
	for (a = j + 1; a < bruh.length; a++) {
		bruh[a]--;
	}
	bruhinput.splice(j, 1);
	//var j = checkboxHolder.indexOf(i);
	deleteHolder.splice(j, 1);
}

var x = 1;
var y = 1;
var tbarHolder = [];
var deleteHolder = [];

function makeInputs() {
	var form = document.getElementById("formStuff");
	var newRow = document.createElement("input");
	newRow.type = "text";
	newRow.id = "c" + x;
	tbarHolder.push(x);
	x++;
	form.appendChild(newRow);
	var deleteButton = document.createElement("button");
	deleteButton.onclick = deleteTbar(deleteButton.id);
	deleteButton.id = "d" + y;
	deleteHolder.push(y);
	form.appendChild(deleteButton);
	y++;
}

function makeMore() {
	var form = document.getElementById("formStuff");
	var breakB = document.createElement("br");
	form.appendChild(breakB);
	var newRow = document.createElement("input");
	newRow.type = "text";
	newRow.id = "row" + x;
	tbarHolder.push(x);
	form.appendChild(newRow);
	var deleteButton = document.createElement("button");
	deleteButton.onclick = deleteTbar(deleteButton.id);
	deleteButton.id = "delete" + y;
	deleteHolder.push(y);
	form.appendChild(deleteButton);
	x++;
	y++;
}
