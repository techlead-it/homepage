import { Link } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

const MAILTO_HREF =
  "mailto:kanehira.sho@techlead-it.com?subject=%E3%80%90%E7%8F%BE%E5%A0%B4%E3%82%8C%E3%82%93%E3%82%89%E3%81%8F%E5%B8%B3%E3%80%91%E3%81%94%E7%9B%B8%E8%AB%87%E5%B8%8C%E6%9C%9B";

function MailCta({ className = "" }: { className?: string }) {
  return (
    <a
      href={MAILTO_HREF}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#EA580C] px-6 py-4 text-lg font-bold text-white transition-colors duration-200 hover:bg-[#C2410C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C] ${className}`}
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

export default function Construction() {
  usePageTitle("現場れんらく帳");

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
            "repeating-linear-gradient(-45deg, #EA580C 0 12px, #1E293B 12px 24px)",
        }}
        aria-hidden="true"
      />

      {/* ヒーロー */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:grid lg:grid-cols-[1fr_440px] lg:items-center lg:gap-12 lg:px-8">
          <div>
            <p className="mb-4 inline-block rounded-full bg-[#FFF7ED] px-4 py-1 text-sm font-bold text-[#C2410C]">
              建設会社さま向け
            </p>
            <h1 className="max-w-5xl font-['Zen_Kaku_Gothic_New'] text-3xl font-black leading-snug text-[#1E293B] sm:text-4xl lg:text-5xl">
              協力会社との連絡、
              <br />
              「言った言わない」になっていませんか。
            </h1>
            <img
              src="/images/solutions/construction/hero.webp"
              width="1600"
              height="1200"
              alt="現場監督のスマホに届いたLINE・FAX・電話の連絡が、1本の流れになって台帳に記録されていくイラスト"
              className="mt-8 w-full max-w-md rounded-lg lg:hidden"
              loading="eager"
              fetchPriority="high"
            />
            <p className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              FAX・電話・LINE。連絡手段はいまのまま変えずに、やり取りを自動で記録して台帳に整理する仕組みを、御社の業務に合わせてつくります。現場に新しいアプリの入力は求めません。
            </p>
            <ul className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-[#1E293B]">
              <li className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2">
                LINE・FAXはそのまま
              </li>
              <li className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2">
                現場の入力は3項目以下
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
            src="/images/solutions/construction/hero.webp"
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
        <h2 className="border-l-4 border-[#EA580C] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
          こんな毎日になっていませんか
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
              連絡手段がバラバラ
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              A社はFAX、B社は電話、C社はLINE。どこで何を伝えたか追えなくなり、「言った言わない」で手戻りが起きる。
            </p>
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
              事務作業が終わらない
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              現場から戻ってから、メモと記憶を頼りに台帳へ転記。報告書と書類仕事のために残業が積み上がっていく。
            </p>
          </div>
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
              アプリを入れたが、紙に戻った
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              施工管理アプリを導入したものの、入力項目が多くて現場が使ってくれない。結局ホワイトボードと紙に逆戻り。
            </p>
          </div>
        </div>
      </section>

      {/* 業界の数字 */}
      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="border-l-4 border-[#EA580C] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
            これは、御社だけの悩みではありません
          </h2>
          <p className="mt-4 text-sm text-[#64748B]">
            建設業界の公開調査データです(当社の実績値ではありません)。
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <p className="font-['Zen_Kaku_Gothic_New'] text-4xl font-black text-[#C2410C]">
                28.3<span className="text-xl">%</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                建設業従事者の28.3%が、事務作業に1日3時間以上を費やしている(1,442名調査)
              </p>
              <a
                href="https://page.andpad.jp/workstyle/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block cursor-pointer text-xs text-[#64748B] underline hover:text-[#1E293B]"
              >
                出典: ANDPAD 時間外労働調査
              </a>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <p className="font-['Zen_Kaku_Gothic_New'] text-4xl font-black text-[#C2410C]">
                40<span className="text-xl">%</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                書類の管理・共有手段は「紙」が40%。クラウド利用は14%にとどまる(1,071名調査)
              </p>
              <a
                href="https://line-works.com/pr/20250707/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block cursor-pointer text-xs text-[#64748B] underline hover:text-[#1E293B]"
              >
                出典: LINE WORKS 建設現場業務実態調査
              </a>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <p className="font-['Zen_Kaku_Gothic_New'] text-4xl font-black text-[#C2410C]">
                43<span className="text-xl">%</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                「過去の資料が探しづらい」と答えた建設業従事者は43%。探し物が日常業務になっている
              </p>
              <a
                href="https://line-works.com/pr/20250707/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block cursor-pointer text-xs text-[#64748B] underline hover:text-[#1E293B]"
              >
                出典: LINE WORKS 建設現場業務実態調査
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="border-l-4 border-[#EA580C] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
          変わるのは事務所だけ。現場はいつも通り。
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6 sm:p-8">
            <img
              src="/images/solutions/construction/before.webp"
              width="1200"
              height="675"
              alt="夕方の事務所で、電話を肩に挟みながら台帳へ手書き転記する事務員のイラスト"
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
                現場・協力会社から FAX・電話・LINE で連絡が届く
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#94A3B8]">
                  2
                </span>
                担当者がメモを取り、覚えておく
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#94A3B8]">
                  3
                </span>
                夕方、記憶とメモから Excel 台帳へ転記する
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#94A3B8]">
                  4
                </span>
                転記漏れ・二重入力・「言った言わない」が発生する
              </li>
            </ol>
          </div>
          <div className="rounded-lg border-2 border-[#EA580C] bg-white p-6 sm:p-8">
            <img
              src="/images/solutions/construction/after.webp"
              width="1200"
              height="675"
              alt="台帳が自動で埋まり、事務員がお茶を飲みながら余裕を持って見守っているイラスト"
              className="mb-6 w-full rounded-md"
              loading="lazy"
            />
            <p className="inline-block rounded-md bg-[#EA580C] px-3 py-1 text-sm font-bold text-white">
              現場れんらく帳を入れると
            </p>
            <ol className="mt-6 space-y-4 text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#C2410C]">
                  1
                </span>
                現場・協力会社からの連絡手段は
                <strong className="font-bold text-[#1E293B]">
                  いままで通り
                </strong>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#C2410C]">
                  2
                </span>
                やり取りが自動で記録され、現場ごとに整理される
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#C2410C]">
                  3
                </span>
                台帳は自動でできあがる。転記作業がなくなる
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 font-['Zen_Kaku_Gothic_New'] font-black text-[#C2410C]">
                  4
                </span>
                「いつ・誰が・何を」をあとから検索して確かめられる
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* 仕組み */}
      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="border-l-4 border-[#EA580C] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
            仕組みは、受け取り口を足すだけ
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
            新しいシステムに「入力してもらう」のではありません。いまの連絡の通り道に受け取り口を1つずつ足して、仕分け係をAIが引き受けます。
          </p>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            <li className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <img
                src="/images/solutions/construction/how-line.webp"
                width="800"
                height="800"
                alt="LINEのグループトークに、れんらく帳のアカウントが招待されるイラスト"
                className="mb-4 aspect-square w-full rounded-md"
                loading="lazy"
              />
              <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#C2410C]">
                その1
              </p>
              <h3 className="mt-2 font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                いつものLINEグループに、アカウントを1つ招待
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                協力会社さんのアプリ追加・操作変更はゼロ。招待した日から、グループのやり取りが自動で記録されていきます。
              </p>
            </li>
            <li className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <img
                src="/images/solutions/construction/how-fax.webp"
                width="800"
                height="800"
                alt="複合機で受信したFAXが自動で取り込まれるイラスト"
                className="mb-4 aspect-square w-full rounded-md"
                loading="lazy"
              />
              <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#C2410C]">
                その2
              </p>
              <h3 className="mt-2 font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                FAXは、複合機の転送設定でそのまま取り込み
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                FAX番号は変わりません。送ってくる側は今まで通り。受信したFAXが自動で読み取られ、記録に加わります。
              </p>
            </li>
            <li className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <img
                src="/images/solutions/construction/how-ai.webp"
                width="800"
                height="800"
                alt="ロボットが紙の連絡を現場別のフォルダに仕分けるイラスト"
                className="mb-4 aspect-square w-full rounded-md"
                loading="lazy"
              />
              <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#C2410C]">
                その3
              </p>
              <h3 className="mt-2 font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                AIが現場ごとに仕分けて、いまの台帳形式で記入
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                「どの現場の・誰からの・何の話か」をAIが判別し、いまお使いのExcel台帳の形式のまま自動で埋めていきます。
              </p>
            </li>
          </ol>
          <div className="mt-8 max-w-3xl rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5 text-sm leading-relaxed">
            <p className="font-['Zen_Kaku_Gothic_New'] font-bold text-[#1E293B]">
              先にお伝えしておくこと
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[#334155]">
              <li>
                電話の通話内容は自動記録の対象外です。通話後にスマホへひと言吹き込むボイスメモ(自動で文字になります)で補います。
              </li>
              <li>
                記録が始まるのは、アカウント招待・転送設定をした日からです。過去のやり取りは遡れません。
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3つの約束 */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="border-l-4 border-[#EA580C] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
            つくるときの3つの約束
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
            私たちは既製品のアプリを売る会社ではありません。御社の仕事のやり方を先に伺い、それに合わせて必要な分だけ仕組みをつくる会社です。
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
              <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                現場の入力は3項目以下
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                入力が多い仕組みは必ず使われなくなります。現場にお願いする操作は、多くても3つまでに絞って設計します。
              </p>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
              <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                いまの連絡手段を変えない
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                協力会社さんに「新しいアプリを入れてください」とは言いません。FAX・電話・LINEのやり取りを、そのまま記録に変えます。
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
        <h2 className="border-l-4 border-[#EA580C] pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl">
          ご相談の流れ
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          <li className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#C2410C]">
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
            <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#C2410C]">
              STEP 2
            </p>
            <h3 className="mt-2 font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
              15分だけ現状を伺う
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              連絡手段・台帳のつけ方・困っている場面を、オンラインで15分だけ伺います。資料のご用意は不要です。
            </p>
          </li>
          <li className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <p className="font-['Zen_Kaku_Gothic_New'] text-sm font-black text-[#C2410C]">
              STEP 3
            </p>
            <h3 className="mt-2 font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
              できること・やめた方がいいことをご回答
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              御社の場合に何が自動化できるか、そして「仕組み化しない方がいい部分」まで含めて無料でお答えします。その場で契約を迫ることはありません。
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
