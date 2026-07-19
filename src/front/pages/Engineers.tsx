import { Link } from "react-router-dom";
import ProcessSection from "../components/sections/ProcessSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import RecruitmentSection from "../components/sections/RecruitmentSection";
import TechStackSection from "../components/sections/TechStackSection";
import Section from "../components/ui/Section";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Engineers() {
  usePageTitle("エンジニアの方へ");

  return (
    <div>
      <Section background="gray">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            エンジニアの方へ
          </h1>
          <p className="text-lg text-gray-600">
            テックリードの技術力・開発文化・採用情報をご紹介します
          </p>
        </div>
      </Section>

      <ProjectsSection background="white" />
      <TechStackSection background="gray" />
      <ProcessSection background="white" />
      <RecruitmentSection background="gray" />

      <Section background="white">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p>
            <Link
              to="/engineers/philosophy"
              className="text-blue-600 hover:underline font-semibold"
            >
              企業理念を見る
            </Link>
          </p>
          <p>
            <a
              href="https://zenn.dev/p/techlead"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-semibold"
            >
              技術ブログ (zenn)
            </a>
          </p>
        </div>
      </Section>
    </div>
  );
}
