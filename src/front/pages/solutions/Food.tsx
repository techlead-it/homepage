import { Link } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

const MAILTO_HREF =
  "mailto:kanehira.sho@techlead-it.com?subject=%E3%80%90%E5%8F%97%E6%B3%A8%E3%82%8C%E3%82%93%E3%82%89%E3%81%8F%E5%B8%B3%E3%80%91%E3%81%94%E7%9B%B8%E8%AB%87%E5%B8%8C%E6%9C%9B";

function MailCta({ className = "" }: { className?: string }) {
  return (
    <a
      href={MAILTO_HREF}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#DC2626] px-6 py-4 text-lg font-bold text-white transition-colors duration-200 hover:bg-[#B91C1C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626] ${className}`}
    >
      15分のオンライン相談をメールで申し込む(無料)
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </a>
  );
}

export default function Food() {
  usePageTitle("受注れんらく帳");

  return (
    <div className="bg-[#F8FAFC] text-[#334155]">
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
        crossOrigin=""
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500;700;900&family=Noto+Sans+JP:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      <div
        className="h-1.5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #DC2626 0 12px, #1E293B 12px 24px)",
        }}
        aria-hidden="true"
      />

      {/* ヒーロー */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:grid lg:grid-cols-[1fr_440px] lg:items-center lg:gap-12 lg:px-8">
          <div>
            <p className="mb-4 inline-block rounded-full bg-[#FEF2F2] px-4 py-1 text-sm font-bold text-[#B91C1C]">
              食品業さま向け
            </p>
            <h1 className="max-w-5xl font-['Zen_Kaku_Gothic_New'] text-3xl font-black leading-snug text-[#1E293B] sm:text-4xl lg:text-5xl">
              毎朝届くFAXの注文書、
              <br />
              入力するだけで一日が終わっていませんか。
            </h1>
            <img
              src="/images/solutions/food/hero.webp"
              width="1600"
              height="1200"
              alt="FAXと電話で届いた注文が、1本の流れになって受注台帳に記録されていくイラスト"
              className="mt-8 w-full max-w-md rounded-lg lg:hidden"
              loading="eager"
              fetchPriority="high"
            />
            <p className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              取引先のFAX・電話はいまのまま変えずに、受注を自動で記録して販売管理表に整理する仕組みを、御社の商品数・受注枚数に合わせてつくります。
            </p>
            <ul className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-[#1E293B]">
              <li className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2">
                取引先のFAXはそのまま
              </li>
              <li className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2">
                電話注文はひと言吹き込むだけ
              </li>
              <li className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2">
                必要な分だけの最小構成
              </li>
            </ul>
            <div className="mt-10">
              <MailCta />
              <p className="mt-3 text-sm text-[#64748B]">
                お問い合わせフォームからのご相談も承っています。
                <Link to="/contact" className="underline hover:text-[#1E293B]">
                  こちら
                </Link>
              </p>
            </div>
          </div>
          <img
            src="/images/solutions/food/hero.webp"
            width="1600"
            height="1200"
            alt=""
            aria-hidden="true"
            className="hidden w-full rounded-lg lg:block"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* 課題共感 */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="border-l-4 border-[#DC2626] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
          こんな毎日になっていませんか
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
              FAX・電話受注の手入力
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              毎朝届くFAXや電話の注文書を、事務の方が販売管理システムに打ち直す作業が続いている。
            </p>
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
              製品別の原価が見えない
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              製品ごとの原価計算ができておらず、値上げ交渉の根拠も作れない。赤字製品に気づかないまま売っているかもしれない。
            </p>
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
              賞味期限・ロット管理がExcel頼み
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              目視+紙+Excelでの管理が続き、入力ミスが廃棄や出荷トラブルに直結する。「最新版がどれか分からない」ことも。
            </p>
          </div>
        </div>
      </section>

      {/* 業界の数字 */}
      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="border-l-4 border-[#DC2626] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
            これは、御社だけの悩みではありません
          </h2>
          <p className="mt-4 text-sm text-[#64748B]">
            食品業界の公開調査データです(当社の実績値ではありません)。
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <p className="font-['Zen_Kaku_Gothic_New'] text-4xl font-black text-[#B91C1C]">
                67<span className="text-xl">%</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                受注方法は「FAX」が最多。いまも受注の主役はFAXという会社さんが多数派
              </p>
              <p className="mt-3 text-xs text-[#64748B]">
                出典: ハンモック「食品業の受注業務に関する実態調査」
              </p>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <p className="font-['Zen_Kaku_Gothic_New'] text-4xl font-black text-[#B91C1C]">
                80<span className="text-xl">%</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                食品製造業の8割が、製品別の原価計算を実施できていない
              </p>
              <p className="mt-3 text-xs text-[#64748B]">
                出典: 日立ソリューションズ東日本 技報
              </p>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <p className="font-['Zen_Kaku_Gothic_New'] text-4xl font-black text-[#B91C1C]">
                92<span className="text-xl">%</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                売上1,000万円以下の事業者の92%が、経理を1人で担当している
              </p>
              <p className="mt-3 text-xs text-[#64748B]">
                出典: 東京商工会議所調査
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="border-l-4 border-[#DC2626] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
          変わるのは事務所だけ。取引先はいつも通り。
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6 sm:p-8">
            <img
              src="/images/solutions/food/before.webp"
              width="1200"
              height="675"
              alt="FAXの山に囲まれ、注文を受注台帳に手入力する事務員のイラスト"
              className="mb-6 w-full rounded-md"
              loading="lazy"
            />
            <p className="inline-block rounded-md bg-[#E2E8F0] px-3 py-1 text-sm font-bold text-[#334155]">
              いま
            </p>
            <ol className="mt-6 space-y-4 text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#94A3B8]">
                  1
                </span>
                毎朝、取引先からFAX・電話で注文が届く
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#94A3B8]">
                  2
                </span>
                事務の方が販売管理システムに手入力する
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#94A3B8]">
                  3
                </span>
                賞味期限・ロットはExcelで別管理し、目視で確認する
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#94A3B8]">
                  4
                </span>
                入力ミス・廃棄ロスが起き、原価が見えず交渉もできない
              </li>
            </ol>
          </div>
          <div className="rounded-lg border-2 border-[#DC2626] bg-white p-6 sm:p-8">
            <img
              src="/images/solutions/food/after.webp"
              width="1200"
              height="675"
              alt="受注台帳が自動で埋まり、事務員がお茶を飲みながら余裕を持って見守っているイラスト"
              className="mb-6 w-full rounded-md"
              loading="lazy"
            />
            <p className="inline-block rounded-md bg-[#DC2626] px-3 py-1 text-sm font-bold text-white">
              受注れんらく帳を入れると
            </p>
            <ol className="mt-6 space-y-4 text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#B91C1C]">
                  1
                </span>
                取引先の注文手段は
                <strong className="font-bold text-[#1E293B]">
                  いままで通り
                </strong>
                (FAX・電話も)
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#B91C1C]">
                  2
                </span>
                注文は自動で取り込まれ、販売管理表に反映される
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#B91C1C]">
                  3
                </span>
                賞味期限・ロットも記録と紐づき、廃棄ミスを防げる
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#B91C1C]">
                  4
                </span>
                原価も見える化され、価格交渉の材料になる
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* 仕組み */}
      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="border-l-4 border-[#DC2626] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
            仕組みは、受け取り口を足すだけ
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
            新しいシステムに「入力してもらう」のではありません。いまの受注の通り道に受け取り口を1つずつ足して、仕分け係をAIが引き受けます。
          </p>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            <li className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <img
                src="/images/solutions/food/how-fax.webp"
                width="800"
                height="800"
                alt="複合機で受信したFAX注文が自動で取り込まれるイラスト"
                className="mb-4 aspect-square w-full rounded-md"
                loading="lazy"
              />
              <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#B91C1C]">
                その1
              </p>
              <h3 className="mt-2 font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                受注のFAXは、複合機の転送設定でそのまま取り込み
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                FAX番号は変わりません。取引先は今まで通り。受信したFAX注文が自動で読み取られ、記録に加わります。
              </p>
            </li>
            <li className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <img
                src="/images/solutions/food/how-voice.webp"
                width="800"
                height="800"
                alt="電話注文をボイスメモで記録するイラスト"
                className="mb-4 aspect-square w-full rounded-md"
                loading="lazy"
              />
              <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#B91C1C]">
                その2
              </p>
              <h3 className="mt-2 font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                電話・LINEでの注文も、ひと言吹き込むだけで自動記録
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                電話を切ったあと、スマホへ商品名と数量をひと言吹き込むだけ。自動で文字になり記録に加わります。
              </p>
            </li>
            <li className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <img
                src="/images/solutions/food/how-ai.webp"
                width="800"
                height="800"
                alt="ロボットが注文を仕分けて受注管理表にまとめるイラスト"
                className="mb-4 aspect-square w-full rounded-md"
                loading="lazy"
              />
              <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#B91C1C]">
                その3
              </p>
              <h3 className="mt-2 font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                AIが商品・数量を仕分けて、いまの受注管理表の形式で自動記入
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                「どの取引先の・何を・いくつの注文か」をAIが判別し、いまお使いの受注管理表の形式のまま自動で埋めていきます。
              </p>
            </li>
          </ol>
          <div className="mt-8 max-w-3xl rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5 text-sm leading-relaxed">
            <p className="font-['Zen_Kaku_Gothic_New'] font-bold text-[#1E293B]">
              先にお伝えしておくこと
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[#334155]">
              <li>
                賞味期限・ロットの実地確認(現物突合)は引き続き必要です。記録・転記の手間だけを減らします。
              </li>
              <li>
                記録が始まるのは、転送設定・運用開始をした日からです。過去の注文履歴は遡れません。
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3つの約束 */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="border-l-4 border-[#DC2626] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
            つくるときの3つの約束
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
            私たちは既製品のアプリを売る会社ではありません。御社の受注枚数・商品数を先に伺い、それに合わせて必要な分だけ仕組みをつくる会社です。
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
              <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                現場の入力は3項目以下
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                入力が多い仕組みは必ず使われなくなります。事務の方にお願いする操作は、多くても3つまでに絞って設計します。
              </p>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
              <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                取引先の注文手段を変えない
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                取引先さんに「FAXをやめてください」とは言いません。FAX・電話・LINEでの注文を、そのまま記録に変えます。
              </p>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
              <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                必要な分だけの最小構成
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                高機能で高額なシステムは提案しません。効果の大きいところから小さく始めて、合わなければやめられる形にします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 相談の流れ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="border-l-4 border-[#DC2626] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
          ご相談の流れ
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          <li className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#B91C1C]">
              STEP 1
            </p>
            <h3 className="mt-2 font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
              メールまたはフォームでご連絡
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              上のボタン、または
              <Link to="/contact" className="underline hover:text-[#1E293B]">
                お問い合わせフォーム
              </Link>
              からご連絡ください。日程を2〜3候補お返しします。
            </p>
          </li>
          <li className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#B91C1C]">
              STEP 2
            </p>
            <h3 className="mt-2 font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
              15分だけ現状を伺う
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              受注手段・商品数・困っている場面を、オンラインで15分だけ伺います。資料のご用意は不要です。
            </p>
          </li>
          <li className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#B91C1C]">
              STEP 3
            </p>
            <h3 className="mt-2 font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
              できること・やめた方がいいことをご回答
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              御社の受注枚数・商品数の場合に何が自動化できるか、そして「仕組み化しない方がいい部分」まで含めて無料でお答えします。その場で契約を迫ることはありません。
            </p>
          </li>
        </ol>
      </section>

      {/* CTA */}
      <section className="bg-[#1E293B]">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <h2 className="font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-white sm:text-3xl">
            まずは15分、いまのやり方を聞かせてください
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#94A3B8] sm:text-base">
            無料です。売り込みはしません。「うちの場合は何ができるのか」への答えだけ持ち帰ってください。
          </p>
          <MailCta className="mt-8" />
          <p className="mt-4 text-sm text-[#94A3B8]">
            <Link to="/contact" className="underline hover:text-white">
              お問い合わせフォーム
            </Link>
            からのご相談も承っています。
          </p>
        </div>
      </section>
    </div>
  );
}
