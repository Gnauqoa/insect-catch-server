// server
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
// firebase
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
// port
dotenv.config();
const port = process.env.PORT || 3000;

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "insect-catch-electric",
    clientEmail:
      "firebase-adminsdk-ado4b@insect-catch-electric.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCptJQTzA2MCw1x\njIPplUZ78HTdMQGsdnTiB4W4xkSDHrlX4iNziiSxUUXdW4Qh85fD7B2eDsWaMPns\nLGXywbzSCL1kRd4lbIGKMbUzjwAsGRNPa87aVp24K/sNc4FDkifAG//wXo1iU+oF\nwlLjF3OI1SthRN27/xv6vnk+OgUSVHriCktNpA+kaSuyTkk+liJSdcIYvH6Mi3iZ\n+ZWAaREW9TAAtk5uOKCmVjdrzGb65O53Ye6W41OQqHd7ln6KGRHdutyd6Oltt6T9\noMcKuOmSirfKSU6RWy2m/JZIsqvpVVTOWUm9ss7kdsW2Ytv0er4bWkUMcWTli9+x\nODEhcLPpAgMBAAECgf8fp073Ylgkhus7ArqYFv/Onkst9rYZNP8YKc8HZ/PfgRuR\nCN0T7/BoIoCliSxcKNNl9+SOVrMEz53OL3nUjc5qXrb0vRNyZ4rB/AOQWlvt3b98\nUN+EWiOQ9qMdHy49LEW9z3stmnVEoeJEsLpFIVqraxdsTSwOpMbTPjPfJ3NKt6ly\nH39RUUrzH2eWlqDL2NEX2RLLqHviAxm+jBTrWS2205JXC48Kgc4k25aI9w65jMSW\n1Wuo9rkp5oQspNfLL47V7JWYe5ykGk97abJkyrG7Vylf82NPo+MeVXd5mH9RPYnE\n5ds0bwRHVUsXteajQ7JgF8V8fndL9/mJTQemyCECgYEA0d0IElY1VUVPfoCzF5Ik\nsxKQ7OPpkzzilreonYW6OS74rnBJgadQRAjgb1RWZOY9cSVIKVhlkO9L6GKSwpRc\nPaTOYCMAu2ypXnHL10V559HdpR6u/HNhy27paIr8sOQXq1XBhzBDTEwbHYr3jQV9\nMy2TVRS1MzFygtjENRLhn1ECgYEAzwN7J9xHRFTUwtkuzxvSq+KHdUZYyux/a+bi\np71nSChLZIZqqXd58JSLUrgDldZsjf/L+uP4Wr4vXRrWEhMSEGvzneHAMrOBzXaH\nlFNhYiD+EC0CzAWyn9O05mOTR+J1Y7lFVBidO8K2aZKaQQDeQySEeZh9dIAtWiNf\nhl1OlRkCgYA+gDNtMpuDn7bDGBU+SdoAMuFSi7X+kb1x4ZSoBTGm4iRR30MlB+1R\ntcsRnO518lQOJGpPVfI5rerPdLv8ky69dR25Z/NJ3ly6se1hWWGq9sep62914+8W\nJRwCdJI5JFUgQ9P1LRx91pSkwcRkDWRyH3qndhlY+7r82Q3mOI9VYQKBgFs2IXFy\nsUP+TLB9mQ5QKAbsDNszX7QpeAtG898MqRE2D+H/B8gbiHLkQG71/T5r9/CpIGsv\nPyJcYeoYBPJ5zJ/HsNODwHeWeD7bVumXw3TFLKxb6LuUVxvs3+wTO7WUpjyGSXHA\nVqcaJ91kZur1Qvk6gdRByCUoxNLOeyxsuE8hAoGAKvTrON7bvWIB77/YpYLFzRvD\nEtsyE7sOkXIuseSsBRAxzNqPDVnbRvs57ARsODUBYbbgpOJql51UZqELd/yOSw20\ni9LpMFWv+TkMVuTClRgkpd9RTUmIzT66FdesUBo5VWWSJGiqXOdGySdfTpQjdhk+\nbAXzu/mBRKq7t4kRuh0=\n-----END PRIVATE KEY-----\n",
  }),
  databaseURL:
    "https://insect-catch-electric-default-rtdb.asia-southeast1.firebasedatabase.app",
});
// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY,
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL
//   }),
//   databaseURL:
//     "https://insect-catch-electric-default-rtdb.asia-southeast1.firebasedatabase.app",
// });
const db = getFirestore();

var jsonParser = bodyParser.json();

app.use(cors());
app.use(jsonParser);

app.post("/updateDeviceData", jsonParser, async (req, res) => {
  try {
    {
      const idDevice = req.body.id;
      const dataUpdate = req.body.data;
      console.log(idDevice , dataUpdate);
      const deviceRef = db.collection('device').doc(idDevice)
      const updateReq = await deviceRef.update({...dataUpdate})
      console.log(updateReq);
      res.send(updateReq)
    }
  } catch (error) {
    console.log(error);
  }
});
app.post("/updateDeviceImg", async (req, res) => {
  try {
    {
    }
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
