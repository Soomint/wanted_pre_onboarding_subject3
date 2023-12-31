import { useRouter } from 'next/navigation'
import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import Link from 'next/link';

interface PARAMS {
    params: {
        id: string;
    }
}

export interface BLOG {
    id: number;
    categories: string[];
    date: string;
    description: string;
    slug: string;
    tags: string[];
    title: string;
    contents: string;
}

const fs = require('fs');
const fm = require('front-matter');

const Blog = async ({ params: { id } }: PARAMS) => {
    const data = await fs.readFileSync(process.cwd().concat(`/__posts/${id}.md`), 'utf-8');

    const parseResult = fm(data);
    const blog = parseResult.attributes;
    const contentsHtml = unified()
        .use(markdown)
        .use(remark2rehype)
        .use(html)
        .processSync(parseResult.body.toString()).value;

    return (
        <>
            <Link href="/">
                <h1 style={{ cursor: 'pointer', marginBottom: '100px' }}>리스트로 이동</h1>
            </Link>
            <table>
                <tr style={{ padding: '5px' }}>
                    <th>카테고리</th>
                    <th>제목</th>
                    <th>작성일자</th>
                    <th>태그</th>
                </tr>
                <tr style={{ padding: '5px' }}>
                    <td>{blog.categories.map((category: string, idx: number) => category.concat((idx + 1) === blog.categories.length ? '' : ', '))}</td>
                    <td>{blog.title}</td>
                    <td>{blog.date}</td>
                    <td>{blog.tags.map((tag: string, idx: number) => '#'.concat(tag).concat((idx + 1) === blog.tags.length ? '' : ' '))}</td>
                </tr>
                <tr style={{ padding: '5px' }}>
                    <td colSpan={4} dangerouslySetInnerHTML={{ __html: contentsHtml }}>
                    </td>
                </tr>
            </table>
        </>
    );
};

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//     const { id } = params as any;

//     const data = await fs.readFileSync(process.cwd().concat(`/__posts/${id}.md`), 'utf-8');

//     const parseResult = fm(data);
//     const blog = parseResult.attributes;
//     const contentsHtml = unified()
//         .use(markdown)
//         .use(remark2rehype)
//         .use(html)
//         .processSync(parseResult.body.toString()).value;

//     return {
//         props: {
//             blog,
//             contentsHtml,
//         },
//     };
// };

export const generateStaticParams = async () => {
    const dir = process.cwd().concat('/__posts'); // 마크다운 블로그 데이터가 존재하는 디렉토리 참조

    const files: string[] = await fs.readdirSync(dir); // files객체에 마크다운 블로그 데이터 세팅

    // const paths = files.map((fileName: string) => {
    //     const fileNameNoExt = fileName.replace(/\.md$/, ''); // 파일이름명 세팅

    //     return { params: { id: fileNameNoExt } } // params 세팅
    // });

    // return { paths, fallback: false };

    return files.map((fileName) => ({
        id: fileName.replace(/\.md$/, ''), // 파일이름명 세팅,
    }))
};

export default Blog;