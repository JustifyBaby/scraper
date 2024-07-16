import { Custom } from "@/types";
import axios from "axios";
import { load } from "cheerio";
import { NextRequest, NextResponse } from "next/server";

const getSiteInfo = async ({ url, selector }: Custom): Promise<string[]> => {
  // サーバーへの負荷防止
  await (() => new Promise((r) => setTimeout(r, 1000)))();
  let datas: string[] = [];

  await axios.get(url).then((res) => {
    const html = res.data;
    const $ = load(html);
    $(selector, html).each(function () {
      const content = $(this).text();
      datas = [...datas, content];
    });
  });

  return datas;
};

export const POST = async (q: NextRequest) => {
  const req: Custom = await q.json();
  const data = await getSiteInfo(req);
  return NextResponse.json(data);
};
