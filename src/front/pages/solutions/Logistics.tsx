import { Link } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

const MAILTO_HREF =
  "mailto:kanehira.sho@techlead-it.com?subject=%E3%80%90%E9%81%8B%E8%A1%8C%E3%82%8C%E3%82%93%E3%82%89%E3%81%8F%E5%B8%B3%E3%80%91%E3%81%94%E7%9B%B8%E8%AB%87%E5%B8%8C%E6%9C%9B";

function MailCta({ className = "" }: { className?: string }) {
  return (
    <a
      href={MAILTO_HREF}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#0D9488] px-6 py-4 text-lg font-bold text-white transition-colors duration-200 hover:bg-[#0F766E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488] ${className}`}
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

export default function Logistics() {
  usePageTitle("運行れんらく帳");

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
            "repeating-linear-gradient(-45deg, #0D9488 0 12px, #1E293B 12px 24px)",
        }}
        aria-hidden="true"
      />

      {/* ヒーロー */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:grid lg:grid-cols-[1fr_440px] lg:items-center lg:gap-12 lg:px-8">
          <div>
            <p className="mb-4 inline-block rounded-full bg-[#F0FDFA] px-4 py-1 text-sm font-bold text-[#0F766E]">
              運輸・物流業さま向け
            </p>
            <h1 className="max-w-5xl font-['Zen_Kaku_Gothic_New'] text-3xl font-black leading-snug text-[#1E293B] sm:text-4xl lg:text-5xl">
              紙の運転日報、請求書への手入力に
              <br />
              毎月何時間かけていますか。
            </h1>
            <img
              src="/images/solutions/logistics/hero.webp"
              width="1600"
              height="1200"
              alt="配車係のスマホに届いた連絡と紙の運転日報が、1本の流れになって台帳に記録されていくイラスト"
              className="mt-8 w-full max-w-md rounded-lg lg:hidden"
              loading="eager"
              fetchPriority="high"
            />
            <p className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              配車連絡・紙の運転日報。いまの手段はそのままに、日報から請求書のもとになる記録までを自動で作る仕組みを、御社の運行形態に合わせてつくります。
            </p>
            <ul className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-[#1E293B]">
              <li className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2">
                配車連絡はそのまま
              </li>
              <li className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2">
                日報は写真を撮るだけ
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
            src="/images/solutions/logistics/hero.webp"
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
        <h2 className="border-l-4 border-[#0D9488] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
          こんな毎日になっていませんか
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
              配車計画がベテラン頼み
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              配車係の経験と勘に依存し、Excelでの管理も限界に近い。もしその方が抜けたら、配車表は誰が引き継げるだろうか。
            </p>
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
              紙の日報が請求書になるまでが長い
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              運転日報(紙)を事務の方が請求書に手入力し、印刷・郵送。取引先ごとにフォーマットが違い、月末にまとめて負担が来る。
            </p>
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
              受発注はいまも紙・FAX
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              契約・見積・受注のやり取りが紙・FAX中心。デジタル化したい気持ちはあっても、何から手を付ければいいか分からない。
            </p>
          </div>
        </div>
      </section>

      {/* 業界の数字 */}
      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="border-l-4 border-[#0D9488] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
            これは、御社だけの悩みではありません
          </h2>
          <p className="mt-4 text-sm text-[#64748B]">
            運輸・物流業界の公開調査データです(当社の実績値ではありません)。
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <p className="font-['Zen_Kaku_Gothic_New'] text-4xl font-black text-[#0F766E]">
                4<span className="text-xl">%</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                運送事業者の受発注・契約業務のデジタル化率は、わずか4%
              </p>
              <p className="mt-3 text-xs text-[#64748B]">
                出典: 国交省 中小物流事業者のためのデジタル化の手引き
              </p>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <p className="font-['Zen_Kaku_Gothic_New'] text-4xl font-black text-[#0F766E]">
                35〜53<span className="text-xl">%</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                一方で「デジタル化を進めたい」という意向を持つ事業者は35〜53%存在する
              </p>
              <p className="mt-3 text-xs text-[#64748B]">
                出典: 国交省 中小物流事業者のためのデジタル化の手引き
              </p>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <p className="font-['Zen_Kaku_Gothic_New'] text-4xl font-black text-[#0F766E]">
                55<span className="text-xl">%</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                踏み切れない理由の最多は「イニシャルコスト」(約55%)
              </p>
              <p className="mt-3 text-xs text-[#64748B]">
                出典: 国交省 中小物流事業者のためのデジタル化の手引き
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="border-l-4 border-[#0D9488] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
          変わるのは事務所だけ。配車も日報もいつも通り。
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6 sm:p-8">
            <img
              src="/images/solutions/logistics/before.webp"
              width="1200"
              height="675"
              alt="夕方の配車事務所で、電話を肩に挟みながら紙の運転日報を請求書に手入力する事務員のイラスト"
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
                ドライバーから紙の運転日報・電話で報告が届く
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#94A3B8]">
                  2
                </span>
                配車係が経験と勘で調整し、Excelへ手打ちする
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#94A3B8]">
                  3
                </span>
                月末、紙日報を見ながら請求書を手入力する
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#94A3B8]">
                  4
                </span>
                転記ミス・請求漏れが起き、荷待ち時間の記録も残らない
              </li>
            </ol>
          </div>
          <div className="rounded-lg border-2 border-[#0D9488] bg-white p-6 sm:p-8">
            <img
              src="/images/solutions/logistics/after.webp"
              width="1200"
              height="675"
              alt="台帳が自動で埋まり、配車係がお茶を飲みながら余裕を持って見守っているイラスト"
              className="mb-6 w-full rounded-md"
              loading="lazy"
            />
            <p className="inline-block rounded-md bg-[#0D9488] px-3 py-1 text-sm font-bold text-white">
              運行れんらく帳を入れると
            </p>
            <ol className="mt-6 space-y-4 text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#0F766E]">
                  1
                </span>
                連絡手段は
                <strong className="font-bold text-[#1E293B]">
                  いままで通り
                </strong>
                (紙日報・電話も)
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#0F766E]">
                  2
                </span>
                日報は写真を撮るだけで自動集計される
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#0F766E]">
                  3
                </span>
                請求書のもとになる記録が自動でできる
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#0F766E]">
                  4
                </span>
                荷待ち時間も記録され、請求の根拠にできる
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* 仕組み */}
      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="border-l-4 border-[#0D9488] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
            仕組みは、受け取り口を足すだけ
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
            新しいシステムに「入力してもらう」のではありません。いまの連絡・報告の通り道に受け取り口を1つずつ足して、仕分け係をAIが引き受けます。
          </p>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            <li className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <img
                src="/images/solutions/logistics/how-line.webp"
                width="800"
                height="800"
                alt="配車連絡のLINEグループに、運行れんらく帳のアカウントが招待されるイラスト"
                className="mb-4 aspect-square w-full rounded-md"
                loading="lazy"
              />
              <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#0F766E]">
                その1
              </p>
              <h3 className="mt-2 font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                いつもの配車連絡のLINEグループに、アカウントを1つ招待
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                ドライバーさんのアプリ追加・操作変更はゼロ。招待した日から、配車連絡が自動で記録されていきます。
              </p>
            </li>
            <li className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <img
                src="/images/solutions/logistics/how-photo.webp"
                width="800"
                height="800"
                alt="手書きの運転日報をスマホで撮影しているイラスト"
                className="mb-4 aspect-square w-full rounded-md"
                loading="lazy"
              />
              <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#0F766E]">
                その2
              </p>
              <h3 className="mt-2 font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                紙の運転日報は、写真を撮るだけで自動集計
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                日報の用紙はそのまま。スマホで撮影するだけで、内容が読み取られ自動で集計されます。
              </p>
            </li>
            <li className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <img
                src="/images/solutions/logistics/how-ai.webp"
                width="800"
                height="800"
                alt="ロボットが運行日報を仕分けて記録にまとめるイラスト"
                className="mb-4 aspect-square w-full rounded-md"
                loading="lazy"
              />
              <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#0F766E]">
                その3
              </p>
              <h3 className="mt-2 font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                AIが運行日報を仕分けて、請求書のもとになる記録を自動作成
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                「どの車両の・いつの・どの取引先向けの記録か」をAIが判別し、請求書作成にそのまま使える形にまとめます。
              </p>
            </li>
          </ol>
          <div className="mt-8 max-w-3xl rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5 text-sm leading-relaxed">
            <p className="font-['Zen_Kaku_Gothic_New'] font-bold text-[#1E293B]">
              先にお伝えしておくこと
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[#334155]">
              <li>
                電話でのやり取りは自動記録の対象外です。通話後にスマホへひと言吹き込むボイスメモ(自動で文字になります)で補います。
              </li>
              <li>
                記録が始まるのは、アカウント招待・運用開始をした日からです。過去の日報は遡れません。
              </li>
              <li>
                すでに別のボットや拡張ツールを入れているLINEグループの場合はご利用いただけないことがあります(1グループに参加できる公式アカウントは1つまで)。
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3つの約束 */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="border-l-4 border-[#0D9488] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
            つくるときの3つの約束
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
            私たちは既製品のアプリを売る会社ではありません。御社の運行形態を先に伺い、それに合わせて必要な分だけ仕組みをつくる会社です。
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
              <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                現場の入力は3項目以下
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                入力が多い仕組みは必ず使われなくなります。ドライバーさんにお願いする操作は、多くても3つまでに絞って設計します。
              </p>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
              <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                いまの連絡手段を変えない
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                取引先や協力会社さんに「新しいアプリを入れてください」とは言いません。紙日報・電話・LINEのやり取りを、そのまま記録に変えます。
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
        <h2 className="border-l-4 border-[#0D9488] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
          ご相談の流れ
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          <li className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#0F766E]">
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
            <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#0F766E]">
              STEP 2
            </p>
            <h3 className="mt-2 font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
              15分だけ現状を伺う
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              配車のやり方・日報のつけ方・困っている場面を、オンラインで15分だけ伺います。資料のご用意は不要です。
            </p>
          </li>
          <li className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#0F766E]">
              STEP 3
            </p>
            <h3 className="mt-2 font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
              できること・やめた方がいいことをご回答
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              御社の運行形態の場合に何が自動化できるか、そして「仕組み化しない方がいい部分」まで含めて無料でお答えします。その場で契約を迫ることはありません。
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
