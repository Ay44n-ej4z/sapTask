const express = require('express');
const cors = require('cors')
const app = express()
const noderfc = require("node-rfc");
const PORT = 5000
const data = require("./router/data")

app.use(express.json())

app.use(cors({ origin: '*',
methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200
}) )

const pool = new noderfc.Pool({ connectionParameters: { 
    ashost: '',
    sysid: '',
    sysnr: '',
    user:   '',
    Passwd: '',
 } 
});

(async () => {
    
    try {
        // get a client connection instance
        const client = await pool.acquire();

        // invoke ABAP function module, passing structure and table parameters

        // ABAP structure
        const abap_structure = {
            RFCINT4: 345,
            RFCFLOAT: 1.23456789,
            RFCCHAR4: "NODE",
            RFCDATE: "20180625", // ABAP date format
            // or RFCDATE: new Date('2018-06-25'), // as JavaScript Date object, with clientOption "date"
        };
        // ABAP table
        let abap_table = [abap_structure];
        app.get('/', async(req, res)=>{
            try {
                const result = await client.call("BAPI_VENDOR_GETDETAIL", {
                        // VENDORNO:"15"
  
                            VENDORNO:"15",    
                            // "server": "node index.js",
                });
                 
                // console.log(req)
                // check the result
                var data= result 
                res.send(data)
              
            
            } catch (err) {
                console.error(err);
            }
        })
        
    } catch (err) {
        // connection and invocation errors
        console.error(err);
    }
})();

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

