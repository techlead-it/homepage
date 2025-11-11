import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Section from "../components/ui/Section";

export default function ContactThanks() {
	return (
		<div>
			<Section background="gray">
				<div className="text-center py-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">送信完了</h1>
					<p className="text-lg text-gray-600">Thank You</p>
				</div>
			</Section>

			<Section background="white">
				<div className="max-w-3xl mx-auto">
					<Card>
						<div className="text-center space-y-6">
							<div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
								<svg
									className="w-10 h-10 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									role="img"
									aria-label="送信完了"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-gray-900 mb-3">
									お問い合わせを受け付けました
								</h2>
								<p className="text-gray-600 leading-relaxed">
									お問い合わせいただき、誠にありがとうございます。
									<br />
									内容を確認の上、2営業日以内に担当者よりご連絡させていただきます。
								</p>
							</div>

							<div className="pt-4">
								<Link
									to="/"
									className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
								>
									トップページに戻る
								</Link>
							</div>
						</div>
					</Card>
				</div>
			</Section>
		</div>
	);
}
