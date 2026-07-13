import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import { clients, companyInfo } from "../data/company";

export default function About() {
  return (
    <div>
      {/* ページヘッダー */}
      <Section background="gray">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">会社概要</h1>
          <p className="text-lg text-gray-600">Company Information</p>
        </div>
      </Section>

      {/* 会社情報 */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
                <div className="font-semibold text-gray-700">会社名</div>
                <div className="md:col-span-2 text-gray-900">
                  {companyInfo.name}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
                <div className="font-semibold text-gray-700">代表取締役</div>
                <div className="md:col-span-2 text-gray-900">
                  {companyInfo.ceo}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
                <div className="font-semibold text-gray-700">設立</div>
                <div className="md:col-span-2 text-gray-900">
                  {companyInfo.founded}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
                <div className="font-semibold text-gray-700">事業内容</div>
                <div className="md:col-span-2 text-gray-900">
                  {companyInfo.businesses.join("、")}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="font-semibold text-gray-700">所在地</div>
                <div className="md:col-span-2 text-gray-900">
                  <div>〒{companyInfo.address.postalCode}</div>
                  <div>
                    {companyInfo.address.prefecture}
                    {companyInfo.address.city}
                    {companyInfo.address.street}
                  </div>
                  <div>{companyInfo.address.building}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* 取引先 */}
      <Section background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">取引先</h2>
          <p className="text-lg text-gray-600">
            これまでお取引いただいた企業様（順不同）
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <a
              key={client.url}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card hover>
                <div className="text-center text-gray-900 hover:text-blue-600 font-medium transition-colors">
                  {client.name}
                </div>
              </Card>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}
