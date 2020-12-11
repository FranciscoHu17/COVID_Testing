row = 0;

fetch('/test_collection', {
    method: 'POST',
    headers: {
        'Content-type':'application/json',
    },
    body: JSON.stringify({
        operation: {
            op: "get"
        }
    })
})
.then(response => response.json())
.then(data => {
    for(i = 0; i < data.length;i++){
        add_to_test(data[i].employeeID, data[i].testBarcode);
	}
})
.catch((error) => {
    console.log('Error', error);
});

add_to_table = () => {
	employee_id = $(".employee_id").val();
	test_barcode = $(".test_barcode").val();
	today = new Date();
	var datetime = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + (today.getDate());
	datetime += " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	
	add_to_db(employee_id, test_barcode, datetime);
	
}

add_to_test = (employee, test) => {
	$(".table").append("<tr>" +
						   "<td><input type = checkbox class = check"+row+"></td>" +
						   "<td>" + employee + "</td>" +
						   "<td>" + test+ "</td>" +
					   "</tr>");
	row++;
}

add_to_db = (employee, test, start) => {
	fetch('/test_collection', {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify({
            operation: {
                op: "add"
            },
            test_collect: {
                testBarcode: test,
                employeeID: employee,
                collectionTime: start
            }
        })
    })
    .then(response => response.json())
    .then(data => {
		if(data.success){
			add_to_test(employee, test);
		}
    })
    .catch((error) => {
        console.log('Error', error);
    });
}

find_checked = () => {
    checked = [];
    for(i = 0; i < row; i++){
        if($(".check"+i)[0].checked)
            checked.push(i);
    }
    return checked;
}

fix_tr = () => {
    for(i = 0; i < row; i++){
        $(".table").find("tr:eq("+(i+1)+")")
                          .children()[0].children[0].className = "check"+i;
    }
}

delete_checked = () => {
	checked = find_checked();
    if(checked.length == 0) return;
    for(i = 0; i < checked.length; i++){
        curr = $(".check" + checked[i]).parent().parent();
		test = curr.children();
		delete_from_db(test[2].innerHTML);
        curr.remove();
    }
    row -= checked.length;
    fix_tr();
}

delete_from_db = (test) => {
	fetch('/test_collection', {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify({
            operation: {
                op: "del"
            },
            test_collect: {
                testBarcode: test
            }
        })
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch((error) => {
        console.log('Error', error);
    });
}
