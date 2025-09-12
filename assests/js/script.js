// sidebar
document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('checkbox');
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    // Handle toggle change
    checkbox.addEventListener('change', function () {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            if (checkbox.checked) {
                sidebar.classList.add('active');
            } else {
                sidebar.classList.remove('active');
            }
            // Prevent desktop collapse styles from conflicting
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
        } else {
            if (checkbox.checked) {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('expanded');
            } else {
                sidebar.classList.remove('collapsed');
                mainContent.classList.remove('expanded');
            }
            // Prevent mobile styles from conflicting
            sidebar.classList.remove('active');
        }
    });

    // Auto-reset on window resize
    window.addEventListener('resize', function () {
        checkbox.checked = false;
        sidebar.classList.remove('active');
        sidebar.classList.remove('collapsed');
        mainContent.classList.remove('expanded');
    });

    // Optional: close sidebar on outside click (mobile only)
    document.addEventListener('click', function (e) {
        const isMobile = window.innerWidth <= 768;
        if (
            isMobile &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !toggleBtn.contains(e.target)
        ) {
            checkbox.checked = false;
            sidebar.classList.remove('active');
        }
    });

    // Submenu toggle logic
    document.querySelectorAll('.submenu-toggle').forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;

            // Optional: close other open submenus
            document.querySelectorAll('.submenu').forEach(menu => {
                if (menu !== submenu) {
                    menu.classList.remove('open');
                    const otherArrow = menu.previousElementSibling?.querySelector('.arrow');
                    if (otherArrow) otherArrow.classList.remove('rotated');
                }
            });
            submenu.classList.toggle('open');
            // Arrow rotation
            const arrow = this.querySelector('.arrow');
            if (arrow) arrow.classList.toggle('rotated');
        });
    });
});

$(document).ready(function () {
    let tables = $("table.dataTable");

    tables.each(function () {
        let table = $(this);
        let headers = [];

        // Get column headers text
        table.find("thead th").each(function (i, th) {
            headers.push($(th).text().trim());
        });

        // On every table draw, update td with data-label
        table.on("draw.dt", function () {
            table.find("tbody tr").each(function () {
                $(this).find("td").each(function (i, td) {
                    $(td).attr("data-label", headers[i] || "");
                });
            });
        });

        // Run once on load
        table.trigger("draw.dt");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Loop through all tables
    document.querySelectorAll("table").forEach(function (table) {
        const headers = [];
        // Collect <th> text
        table.querySelectorAll("thead th").forEach(function (th) {
            headers.push(th.innerText.trim());
        });

        // Apply as data-label for each <td>
        table.querySelectorAll("tbody tr").forEach(function (row) {
            row.querySelectorAll("td").forEach(function (td, i) {
                if (headers[i]) {
                    td.setAttribute("data-label", headers[i]);
                }
            });
        });

        // Do the same for <tfoot> if needed
        table.querySelectorAll("tfoot tr").forEach(function (row) {
            row.querySelectorAll("td").forEach(function (td, i) {
                if (headers[i] && !td.hasAttribute("data-label")) {
                    td.setAttribute("data-label", headers[i]);
                }
            });
        });
    });
});

