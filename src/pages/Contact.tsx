// import type { FormEvent } from "react";
// import { useState } from "react";
// import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Section from "../components/ui/Section";

export default function Contact() {
	// const [formData, setFormData] = useState({
	// 	name: "",
	// 	email: "",
	// 	company: "",
	// 	subject: "",
	// 	message: "",
	// });

	// const handleSubmit = (e: FormEvent) => {
	// 	e.preventDefault();
	// 	// TODO: 実際のフォーム送信処理を実装
	// 	alert(
	// 		"お問い合わせフォームは現在準備中です。お急ぎの場合は直接メールにてご連絡ください。",
	// 	);
	// };

	// const handleChange = (
	// 	e: React.ChangeEvent<
	// 		HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
	// 	>,
	// ) => {
	// 	const { name, value } = e.target;
	// 	setFormData((prev) => ({ ...prev, [name]: value }));
	// };

	return (
		<div>
			{/* ページヘッダー */}
			<Section background="gray">
				<div className="text-center py-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						お問い合わせ
					</h1>
					<p className="text-lg text-gray-600">Contact Us</p>
				</div>
			</Section>

			{/* お問い合わせ方法 */}
			<Section background="white">
				<div className="max-w-3xl mx-auto">
					<div className="text-center mb-8">
						<p className="text-gray-600 leading-relaxed">
							ご相談・お見積りは無料です。お気軽にお問い合わせください。
							<br />
							通常、2営業日以内にご返信いたします。
						</p>
					</div>

					<Card>
						<div className="text-center space-y-8">
							<div>
								<h3 className="text-xl font-bold text-gray-900 mb-4">
									メールでのお問い合わせ
								</h3>
								<p className="text-gray-600 mb-4">
									以下のメールアドレスまでお気軽にご連絡ください。
								</p>
								<a
									href="mailto:kanehira.sho@techlead-it.com"
									className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
								>
									kanehira.sho@techlead-it.com
								</a>
							</div>

							<div className="border-t border-gray-200 pt-8">
								<h4 className="text-lg font-semibold text-gray-900 mb-4">
									お問い合わせ内容について
								</h4>
								<div className="text-left max-w-xl mx-auto space-y-3 text-gray-600">
									<p>• サービスに関するご質問</p>
									<p>• お見積りのご依頼</p>
									<p>• 開発のご相談</p>
									<p>• 採用に関するお問い合わせ</p>
									<p>• その他、お気軽にご相談ください</p>
								</div>
							</div>
						</div>
					</Card>

					{/* フォームは一旦コメントアウト */}
					{/* <Card>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									お名前 <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="name"
									name="name"
									required
									value={formData.name}
									onChange={handleChange}
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>

							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									メールアドレス <span className="text-red-500">*</span>
								</label>
								<input
									type="email"
									id="email"
									name="email"
									required
									value={formData.email}
									onChange={handleChange}
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>

							<div>
								<label
									htmlFor="company"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									会社名・団体名
								</label>
								<input
									type="text"
									id="company"
									name="company"
									value={formData.company}
									onChange={handleChange}
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>

							<div>
								<label
									htmlFor="subject"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									お問い合わせ種別 <span className="text-red-500">*</span>
								</label>
								<select
									id="subject"
									name="subject"
									required
									value={formData.subject}
									onChange={handleChange}
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									<option value="">選択してください</option>
									<option value="service">サービスについて</option>
									<option value="estimate">お見積り依頼</option>
									<option value="recruitment">採用について</option>
									<option value="other">その他</option>
								</select>
							</div>

							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									お問い合わせ内容 <span className="text-red-500">*</span>
								</label>
								<textarea
									id="message"
									name="message"
									required
									rows={6}
									value={formData.message}
									onChange={handleChange}
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-5 00 focus:border-transparent"
								/>
							</div>

							<div className="text-center">
								<Button type="submit" size="lg">
									送信する
								</Button>
							</div>
						</form>
					</Card> */}
				</div>
			</Section>
		</div>
	);
}
