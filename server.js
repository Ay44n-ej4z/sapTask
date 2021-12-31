const express = require('express');
const cors = require('cors')
const app = express()
const noderfc = require("node-rfc");
const PORT = 5000;
const data = require("./router/data");

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],

}))

app.use(express.json());


app.get('/', async(req, res) => {
    try {
        function pad_with_zeroes(number, length) {
    
            var my_string = '' + number;
            
            while (my_string.length < length) {
                my_string = '0' + my_string;
                
            }
            
        
            return my_string;
            
        }
        var num ;
        var l;
        if(num == 1 || 2 ||3 || 4 || 5 || 6 || 7 || 8 || 9 ){
                l = 10 
            }else{
        
            }
        console.log(pad_with_zeroes(10, l));
        
        // const data = await CallBAPI("BAPI_VENDOR_GETDETAIL", {
        //     VENDORNO: "0000000015",
        // });
        const data = await CallBAPI("BAPI_USER_GETDETAIL",{
            USERNAME: 'P9TRNG',
        })
        res.send(data)
    } catch (err) {
        res.status(500).send(err);
    }

})

// const noderfc = require("node-rfc");

// init();

/**
 * Name: init
 * Description: Function start point
 * Created By: Suman
 * Created At:
 */
// async function init() {
//     app.get('/', async(req, res) => {

//     try {
//         const data = await CallBAPI( "BAPI_USER_GET_DETAIL",{
//             USERNAME: 'p9trng',
//         },);
//         res.send(data)
//         // console.log(data);

//     } catch (e) {
//         console.log(e);
//     }
// })
// }

/**
 * Name: CallBAPI
 * Description: Function to call BAPI to get data
 * @param FUNCTION_MODULE Send the Function Module name
 * @param props send the parameters to pass.
 * Created By: Suman
 * Created At:
 */
async function CallBAPI(FUNCTION_MODULE, props) {
    try {
        console.log("Wait processing");
        const Client = await Connect();
        console.log("Getting Data. Please Wait.");
        return new Promise((resolve, reject) => {
            Client.invoke(FUNCTION_MODULE, props, (err, res) => {
                if (err) {
                    console.log(err)
                    reject(err);
                }
                resolve(res);
            });
        })
    } catch (e) {
        return e;
    }
}

/**
 * Name: Connect
 * Description: Function to call connect to sap system using RFC
 * Created By: Suman
 * Created At:
 */
function Connect() {
    const abapSystem = {
        ashost: 'sap.roitech.in',
        sysid: 'IDS',
        sysnr: '05',
        user: 'P9TRNG',
        Passwd: 'ROITech1234',
        dest: "MME",
    }

    let client = new noderfc.Client(abapSystem);
    return new Promise((resolve, reject) => {
        client.connect(async function (err) {
            if (err) {
                console.log(err);
                console.log(err.message);
                reject(err);
            } else {
                console.log("Connection Successful");
                resolve(client);
            }
        });
    })
}



// Done!!
// Ayaan Ejaz, Today at 4:00 PM

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})











