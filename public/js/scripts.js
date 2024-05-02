// universal hide/show toggling function
function toggleThis(what) {
    let x = document.getElementById(what);
    if (x.style.display === 'none') {
        x.style.display = 'block';
    }
    else {
        x.style.display = 'none';
    }
}

// universal table sorting function
function sortTable(what, how) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById(what);
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[how];
            y = rows[i + 1].getElementsByTagName("TD")[how];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}