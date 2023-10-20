import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import path from "path";

inquirer
  .prompt([{ message: "masukkan URL anda: ", name: "URL" }])
  .then((answers) => {
    const url = answers.URL;
    const qr_svg = qr.image(url);

    const folder = "./kode_Qr/";
    const filename = 'kode_qr.png';
    const destinationPath = path.join(folder, filename);

    // Memindahkan file QR dari direktori saat ini ke folder tujuan
    qr_svg.pipe(fs.createWriteStream(filename))
      .on("finish", () => {
        // Pindahkan file QR ke folder tujuan
        fs.rename(filename, destinationPath, (err) => {
          if (err) {
            console.error("Gagal memindahkan file QR:", err);
          } else {
            console.log("File QR berhasil dipindahkan ke folder tujuan!");
          }
        });
      })
      .on("error", (err) => {
        console.error("Gagal menulis file QR:", err);
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
