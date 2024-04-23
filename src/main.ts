import axios from "axios";
import { load } from "cheerio";
import "./style.css";

const getSiteInfo = (): void => {
  // サーバーへの負荷防止
  setTimeout(() => {
    const url = document.querySelector<HTMLInputElement>("#url");
    const selector = document.querySelector<HTMLInputElement>("#selector");
    const fileName = document.querySelector<HTMLInputElement>("#fileName");
    const downloadLink =
      document.querySelector<HTMLAnchorElement>("#downloadLink");

    const datas: string[] = [];

    if (!url || !selector || !fileName) throw new Error();
    axios
      .get(url.value)
      .then((res) => {
        const html = res.data;
        const $ = load(html);
        $(selector.value, html).each(function () {
          const content = $(this).text();
          datas.push(content);
        });
        const blob = new Blob(datas);
        // データからURLを生成する
        const objUrl = window.URL.createObjectURL(blob);

        downloadLink?.setAttribute("href", objUrl);
        // aタグにdownload属性を設定する (第二引数はダウンロード時のファイル名)
        downloadLink?.setAttribute("download", `${fileName.value}.json`);
      })
      .catch((err) => console.error(err + " is happened"));
  }, 500);
};

document.getElementById("exe")?.addEventListener("click", () => getSiteInfo());
