$(document).ready(function() {
    $('#fileInput').on('change', handleFileSelect);
    // $('#printButton').on('click', function() {
        
    //     // var printContent = $('#previewContainer').html();
    //     // var originalContent = $('body').html();
    //     // $('body').html(printContent);
    //     // window.print();
    //     // $('body').html(originalContent);




    //     var printContents = document.getElementById('printme').innerHTML;
    //     var originalContents = document.body.innerHTML;

    //     document.body.innerHTML = printContents;

    //     window.print();

    //     document.body.innerHTML = originalContents;
    // });

    function handleFileSelect(event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: 'array' });
            var sheetName = workbook.SheetNames[0];
            var sheet = workbook.Sheets[sheetName];
            var jsonData = XLSX.utils.sheet_to_json(sheet, { defval: '' });
            var shlokKramank = sheet['L2'].v?sheet['L2'].v:'';

            // var groupedData = groupByMultipleKeys(jsonData, ['श्री सदस्य', 'श्रीमंगलाचरण']);
            var groupedData = groupBy(jsonData,'श्रीमंगलाचरण');
            generateHTML(groupedData, shlokKramank);
        };

        reader.readAsArrayBuffer(file);
    }

    function groupBy(data, key) {
        return data.reduce(function(acc, item) {
            (acc[item[key]] = acc[item[key]] || []).push(item);
            return acc;
        }, {});
    }


    function groupByMultipleKeys(arr, keys) {
        return arr.reduce((acc, curr) => {
            var groupKey = keys.map(key => curr[key]).join(' - ');
            (acc[groupKey] = acc[groupKey] || []).push(curr);
            return acc;
        }, {});
    }

    function generateHTML(data, shlokKramank) {
        var container = $('#previewContainer');
        container.empty();

        $.each(data, function(group, records) {
            var card = $('<div class="card"></div>');

            card.append(`
                <h4>|| श्रीराम समर्थ ||</h4>
                <h4>|| जय जय रघुवीर समर्थ ||</h4>
            `);
            var headerContent = `
            <div class="card-header">
                <p><strong>श्री सदस्य:</strong> ${group.split(' - ')[0]}</p>
                <p><strong>श्लोक क्र:</strong> ${shlokKramank}</p>
            </div>
        `;
        card.append(headerContent);
            var table = $('<table></table>');
            var headerRow = `
                <tr>
                    <th style="width: 5%;">अ.क्रं</th>
                    <th style="width:15%;">श्रीबैठक</th>
                    <th style="width: 15%;">दिनांक <br>व वार</th>
                    <th style="width: 20%;">वेळ</th>
                    <th style="width: 18%;">श्रीमंगलाचरण</th>
                    <th style="width: 18%;">वर्तमान समास</th>
                </tr>
            `;
            table.append(headerRow);

            records.forEach(function(row, index) {
                var dataRow = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${row['श्री बैठकीचे  स्थळ']}</td>
                        <td>${row['दिनांक']}<br>${row['वार']}</td>
                        <td>${row['वेळ']}</td>
                        <td>&#x2714;</td>
                        <td>&#x2714;</td>
                    </tr>
                `;
                table.append(dataRow);
            });

            card.append(table);
            container.append(card);
        });
    }
});


// $(document).ready(function() {
//     $('#fileInput').on('change', handleFileSelect);
//     $('#printButton').on('click', function() {
//         window.print();
//     });

//     function handleFileSelect(event) {
//         var file = event.target.files[0];
//         var reader = new FileReader();

//         reader.onload = function(e) {
//             var data = new Uint8Array(e.target.result);
//             var workbook = XLSX.read(data, { type: 'array' });
//             var sheetName = workbook.SheetNames[0];
//             var sheet = workbook.Sheets[sheetName];
//             var jsonData = XLSX.utils.sheet_to_json(sheet, { defval: '' });
//             var shlokKramank = sheet['A1'] ? sheet['A1'].v : '';

//             var groupedData = groupByMultipleKeys(jsonData, ['श्री सदस्य', 'श्रीमंगलाचरण']);
//             generateHTML(groupedData, shlokKramank);
//         };

//         reader.readAsArrayBuffer(file);
//     }

//     function groupByMultipleKeys(arr, keys) {
//         return arr.reduce((acc, curr) => {
//             var groupKey = keys.map(key => curr[key]).join(' - ');
//             (acc[groupKey] = acc[groupKey] || []).push(curr);
//             return acc;
//         }, {});
//     }

//     function generateHTML(data, shlokKramank) {
//         var container = $('#previewContainer');
//         container.empty();

//         $.each(data, function(group, records) {
//             var card = $('<div class="card"></div>');
//             card.append(`
//                 <h1>|| श्रीराम समर्थ ||</h1>
//                 <h2>|| जय जय रघुवीर समर्थ ||</h2>
//                 <p><strong>श्री सदस्य:</strong> ${group.split(' - ')[0]} <strong>श्री मंगलाचरण:</strong> ${group.split(' - ')[1]} <strong>श्लोक क्र:</strong> ${shlokKramank}</p>
//             `);
//             var table = $('<table></table>');
//             var headerRow = `
//                 <tr>
//                     <th style="width: 5%;">अ. क्रं</th>
//                     <th style="width: 30%;">दिनांक व वार</th>
//                     <th style="width: 20%;">वेळ</th>
//                     <th style="width: 25%;">श्रीमंगलाचरण</th>
//                     <th style="width: 20%;">वर्तमान समास</th>
//                 </tr>
//             `;
//             table.append(headerRow);

//             records.forEach(function(row, index) {
//                 var dataRow = `
//                     <tr>
//                         <td>${index + 1}</td>
//                         <td>${row['दिनांक']} ${row['वार']}</td>
//                         <td>${row['वेळ']}</td>
//                         <td>${row['श्रीमंगलाचरण']}</td>
//                         <td>${row['वर्तमान समास']}</td>
//                     </tr>
//                 `;
//                 table.append(dataRow);
//             });

//             card.append(table);
//             container.append(card);
//         });
//     }
// });



