var row = 0;

add_to_well = () => {
    well = $(".well_barcode").val();
    pool = $(".pool_barcode").val();
    status = $(".status").val();
    $(".well_testing table").append("<tr>" +
                                        "<td><input type = checkbox class = check"+row+"></td>" +
                                        "<td>" + well + "</td>" +
                                        "<td>" + pool + "</td>" +
                                        "<td>" + status+ "</td>" +
                                    "</tr>")
    row++;
    //add_to_db(well, pool, status)
}

add_to_db = (well, pool, status) => {

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
        curr.remove();
        //delete_from_db()
    }
    row -= checked.length;
    fix_tr();
}

delete_from_db = () => {

}