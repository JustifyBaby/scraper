"use client";

import { Custom } from "@/types";
import { useRef, useState } from "react";

const Scraper = () => {
  const urlRef = useRef<HTMLInputElement>(null);
  const selectorRef = useRef<HTMLInputElement>(null);
  const fileNameRef = useRef<HTMLInputElement>(null);
  const fileTypeRef = useRef<HTMLSelectElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const [data, setData] = useState<string[]>([]);

  const main = async () => {
    if (
      urlRef.current?.value === "" ||
      selectorRef.current?.value === "" ||
      fileNameRef.current?.value === "" ||
      // fileTypeRef?.value === "" ||
      !downloadRef.current
    )
      throw new Error();

    if (
      fileTypeRef.current!.value !== "txt" &&
      fileTypeRef.current!.value !== "json"
    )
      throw new Error();

    const body: Custom = {
      url: urlRef.current!.value,
      selector: selectorRef.current!.value,
    };

    const res = await fetch("http://localhost:3000/api/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const datas: string[] = await res.json();

    const blob = new Blob(datas);

    const objUrl = window.URL.createObjectURL(blob);

    downloadRef.current.setAttribute("href", objUrl);

    // aタグにdownload属性を設定する (第二引数はダウンロード時のファイル名)
    downloadRef.current.setAttribute(
      "download",
      `${fileNameRef.current!.value}.${fileTypeRef.current!.value}`
    );

    setData(datas);
  };

  return (
    <div id='app'>
      <div id='form'>
        <div>
          <label>URL：</label>
          <input type='text' id='url' ref={urlRef} />
        </div>
        <div>
          <label>セレクタ：</label>
          <input type='text' id='selector' ref={selectorRef} />
        </div>
        <div>
          <label>保存先のファイル名：</label>
          <input type='text' id='fileName' ref={fileNameRef} />

          <select name='filetype' id='filetype' ref={fileTypeRef}>
            <option value='txt'>txt</option>
            <option value='json'>json</option>
          </select>
        </div>
        <button id='exe' onClick={async () => await main()}>
          実行
        </button>
      </div>
      <div id='selectorList'>{JSON.stringify(data)}</div>
      <div className=''>
        <a id='downloadLink' ref={downloadRef}>
          Download
        </a>
      </div>
    </div>
  );
};

export default Scraper;
