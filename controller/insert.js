import executor from "../model/db.js"

const Insert = async (data) => {

  //const { fieldname, originalname, encoding, mimetype, buffer, size } = file
  try {
    const query = `
    UPDATE files
    SET email = ?, sendername = ?, recipient = ?, message = ?
    WHERE fileid = ?
  `;
    executor(query, [data.email, data.sender, data.recipient, data.message,data.string])
    return true;
  }
  catch (error) {
    console.log(error)
  }
}

export default Insert;
/*
 {
    fieldname: 'file',
    originalname: '01 Olutoye peter resume.docx',
    encoding: '7bit',
    mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    buffer: <Buffer 50 4b 03 04 14 00 00 00 08 00 f1 0d 47 58 98 d3 81 c3 22 01 00 00 0f 03 00 00 13 00 00 00 5b 43 6f 6e 74 65 6e 74 5f 54 79 70 65 73 5d 2e 78 6d 6c a5 ... 7470 more bytes>,
    size: 7520
  }
] [Object: null prototype] {
  email: 'ddd',
  sender: 'ddddd',
  recipient: 'ddd',
  subject: 'ddd'
*/