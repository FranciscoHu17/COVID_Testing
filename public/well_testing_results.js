var row = 0;

add_to_well = () => {
    today = new Date();
    var datetime = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + (today.getDate());
    datetime += " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    well = $(".well_barcode").val();
    pool = $(".pool_barcode").val();
    start = datetime;
    end = datetime;
    status = $(".status").val();

    add_to_db(well, pool, start, end, status);
}

add_to_db = (well, pool, start, end, status) => {
    fetch('/well_testing', {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify({
            operation: {
                op: "add"
            },
            well_test: {
                poolBarcode: pool,
                wellBarcode: well,
                startTime: start,
                endTime: end,
                result: status
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            $(".well_testing table").append("<tr>" +
                                        "<td><input type = checkbox class = check"+row+"></td>" +
                                        "<td>" + well + "</td>" +
                                        "<td>" + pool + "</td>" +
                                        "<td>" + status+ "</td>" +
                                    "</tr>")
            row++;
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
        $(".well_testing").find("tr:eq("+(i+1)+")")
                          .children()[0].children[0].className = "check"+i;
    }
}

edit_checked = () => {
    checked = find_checked();
    if(checked.length == 0) return;
    curr = $(".check"+checked[0]).parent().siblings();
    $(".well_barcode").val(curr[0].innerHTML);
    $(".pool_barcode").val(curr[1].innerHTML);
    $(".status").val(curr[2].innerHTML);
}

delete_checked = () => {
    checked = find_checked();
    if(checked.length == 0) return;
    for(i = 0; i < checked.length; i++){
        curr = $(".check" + checked[i]).parent().parent();
        well_test = curr.children();
        delete_from_db(well_test[1].innerHTML, well_test[2].innerHTML, well_test[3].innerHTML);
        curr.remove();
    }
    row -= checked.length;
    fix_tr();
}

delete_from_db = (well, pool, status) => {
    fetch('/well_testing', {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify({
            operation: {
                op: "del"
            },
            well_test: {
                poolBarcode: pool,
                wellBarcode: well,
                result: status
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