var row = 0;

fetch('/pool_mapping', {
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
    for(j = 0; j < data.length;j++){
        add_to_table(data[j].poolBarcode, [data[j].testBarcode]);
	}
})
.catch((error) => {
    console.log('Error', error);
});

add_more_test = () => {
	$(".test_barcodes").append("<br>&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp"+
							   "<input class=test_barcode type=text>");
}

submit_pool = () => {
	pools = $(".test_barcodes").children();
	test_barcodes = [];
	for(i = 2; i < pools.length; i+=2){		
		test_barcodes.push(pools[i].value);
	}
	add_to_db($(".pool_barcode").val(), test_barcodes);
}

add_to_table = (pool, test_barcodes) => {
	test = "";
	for(i = 0; i < test_barcodes.length; i++){
		test += test_barcodes[i];
		if(i < test_barcodes.length - 1)
			test += ", ";
	}

	$(".table").append("<tr>" +
                            "<td><input type = checkbox class = check"+row+"></td>" +
                            "<td>" + pool + "</td>" +
                            "<td>" + test+ "</td>" +
							"</tr>");
	row++;
}

add_to_db = (pool, tests) => {
	fetch('/pool_mapping', {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify({
            operation: {
                op: "add"
            },
            pool_map: {
				poolBarcode: pool,
				testBarcodes: tests
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            add_to_table(pool, tests);
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
	console.log(checked)
    if(checked.length == 0) return;
    for(i = 0; i < checked.length; i++){
        curr = $(".check" + checked[i]).parent().parent();
		pool_map = curr.children();
		delete_from_db(pool_map[1].innerHTML, parse_test_barcodes(pool_map[2].innerHTML));
        curr.remove();
    }
    row -= checked.length;
    fix_tr();
}

edit_checked = () => {
    checked = find_checked();
    if(checked.length == 0) return;
	curr = $(".check"+checked[0]).parent().siblings();
	$(".pool_barcode").val(curr[0].innerHTML);
	test_barcodes = parse_test_barcodes(curr[1].innerHTML)
	test = $(".test_barcodes").children();

	for(i = 2; i < test.length; i += 2){
		test[i].value = test_barcodes[i/2-1]
	}
}

parse_test_barcodes = (test) => {
	return test.split(", ");
}

delete_from_db = (pool, tests) => {
    fetch('/pool_mapping', {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify({
            operation: {
                op: "del"
            },
            pool_map: {
                poolBarcode: pool,
                testBarcodes: tests 
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
