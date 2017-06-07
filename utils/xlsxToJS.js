/**
 * Created by simvolice on 28.05.2017 16:26
 */


const XLSX = require('xlsx');





module.exports = {

  parseXLSX: function (pathToXLSX) {




    let workbook = XLSX.readFile(pathToXLSX);

    let sheet_name_list = workbook.SheetNames[0];

      let worksheet = workbook.Sheets[sheet_name_list];
      let headers = {};
      let data = [];
      for(let z in worksheet) {
        if(z[0] === '!') continue;
        //parse out the column, row, and value
        let tt = 0;
        for (let i = 0; i < z.length; i++) {
          if (!isNaN(z[i])) {
            tt = i;
            break;
          }
        };
        let col = z.substring(0,tt);
        let row = parseInt(z.substring(tt));
        let value = worksheet[z].v;

        //store header names
        if(row == 1 && value) {
          headers[col] = value;
          continue;
        }

        if(!data[row]) data[row]={};
        data[row][headers[col]] = value;
      }
      //drop those first two rows which are empty
      data.shift();
      data.shift();





      return data;





  }

};



