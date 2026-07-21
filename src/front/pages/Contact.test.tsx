import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import Contact from "./Contact";

function renderContact() {
  return render(
    <MemoryRouter initialEntries={["/contact"]}>
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/thanks" element={<p>送信完了</p>} />
      </Routes>
    </MemoryRouter>
  );
}

const validFormData = {
  name: "テスト太郎",
  email: "test@example.com",
  subject: "サービスについて",
  message: "これはテスト用のお問い合わせメッセージです。",
};

async function fillAndSubmitForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/お名前/), validFormData.name);
  await user.type(screen.getByLabelText(/メールアドレス/), validFormData.email);
  await user.selectOptions(
    screen.getByLabelText(/お問い合わせ種別/),
    validFormData.subject
  );
  await user.type(
    screen.getByLabelText(/お問い合わせ内容/),
    validFormData.message
  );
  await user.click(screen.getByRole("button", { name: "送信する" }));
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Contact", () => {
  it("ページ別のdocument.titleを設定する", () => {
    renderContact();

    expect(document.title).toBe("お問い合わせ | 株式会社テックリード");
  });

  it("shows validation errors when required fields are empty on submit", async () => {
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByRole("button", { name: "送信する" }));

    await waitFor(() => {
      expect(screen.getByText("お名前を入力してください")).toBeInTheDocument();
    });
    expect(
      screen.getByText("メールアドレスを入力してください")
    ).toBeInTheDocument();
    expect(
      screen.getByText("お問い合わせ内容は10文字以上で入力してください")
    ).toBeInTheDocument();
  });

  it("navigates to thanks page on successful submission", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true, messageId: "123" }), {
        status: 200,
      })
    );
    vi.stubGlobal("fetch", fetchMock);
    renderContact();

    await fillAndSubmitForm(user);

    await waitFor(() => {
      expect(screen.getByText("送信完了")).toBeInTheDocument();
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("shows field errors returned by server", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            errors: { name: "名前が不正です" },
          }),
          { status: 400 }
        )
      )
    );
    renderContact();

    await fillAndSubmitForm(user);

    await waitFor(() => {
      expect(screen.getByText("名前が不正です")).toBeInTheDocument();
    });
  });

  it("shows generic error when server returns only unknown field errors", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            errors: { unknown_field: "不明なエラー" },
          }),
          { status: 400 }
        )
      )
    );
    renderContact();

    await fillAndSubmitForm(user);

    await waitFor(() => {
      expect(screen.getByText("送信に失敗しました")).toBeInTheDocument();
    });
  });

  it("shows single error message returned by server", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: "メール送信に失敗しました" }), {
          status: 500,
        })
      )
    );
    renderContact();

    await fillAndSubmitForm(user);

    await waitFor(() => {
      expect(screen.getByText("メール送信に失敗しました")).toBeInTheDocument();
    });
  });

  it("shows generic error when server returns unparseable response", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response("Internal Server Error", { status: 500 })
        )
    );
    renderContact();

    await fillAndSubmitForm(user);

    await waitFor(() => {
      expect(screen.getByText("送信に失敗しました")).toBeInTheDocument();
    });
  });

  it("件名の初期選択は「30分無料相談」であり、変更せず送信すると成功する", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true, messageId: "123" }), {
        status: 200,
      })
    );
    vi.stubGlobal("fetch", fetchMock);
    renderContact();

    expect(screen.getByLabelText(/お問い合わせ種別/)).toHaveDisplayValue(
      "30分無料相談"
    );

    await user.type(screen.getByLabelText(/お名前/), validFormData.name);
    await user.type(
      screen.getByLabelText(/メールアドレス/),
      validFormData.email
    );
    await user.type(
      screen.getByLabelText(/お問い合わせ内容/),
      validFormData.message
    );
    await user.click(screen.getByRole("button", { name: "送信する" }));

    await waitFor(() => {
      expect(screen.getByText("送信完了")).toBeInTheDocument();
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining('"subject":"30分無料相談"'),
      })
    );
  });

  it("disables submit button and shows loading text during submission", async () => {
    const user = userEvent.setup();
    let resolveFetch: (value: Response) => void;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(
        new Promise<Response>((resolve) => {
          resolveFetch = resolve;
        })
      )
    );
    renderContact();

    await fillAndSubmitForm(user);

    await waitFor(() => {
      const button = screen.getByRole("button", { name: "送信中..." });
      expect(button).toBeDisabled();
    });

    resolveFetch!(
      new Response(JSON.stringify({ success: true, messageId: "123" }), {
        status: 200,
      })
    );

    await waitFor(() => {
      expect(screen.getByText("送信完了")).toBeInTheDocument();
    });
  });
});
