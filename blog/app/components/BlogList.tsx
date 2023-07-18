import Link from 'next/link';
import { BLOG } from '../blogs/[id]/page'

const fs = require('fs');
const fm = require('front-matter');

const Home = async () => {
    const dir = process.cwd().concat('/__posts'); // 마크다운 블로그 데이터가 존재하는 디렉토리 참조

    const files: string[] = await fs.readdirSync(dir); // files객체에 마크다운 블로그 데이터 세팅

    const blogList = files.map((fileName: string) => {
        const id = fileName.replace(/\.md$/, ''); // 파일이름명 세팅

        const file = fs.readFileSync(process.cwd().concat(`/__posts/${id}.md`), 'utf-8'); // 해당파일 파일객체 선언

        const contents = fm(file).attributes; // front-matter 라이브러리로 마크다운 메타데이터 파싱

        return {
            id,
            ...contents,
        }
    });

    return (
        <>
            <h1 style={{ marginBottom: '100px' }}>블로그 리스트</h1>
            <table>
                <tr style={{ padding: '5px' }}>
                    <th>카테고리</th>
                    <th>제목</th>
                    <th>작성일자</th>
                    <th>설명</th>
                    <th>태그</th>
                </tr>
                {
                    blogList.map((blog: BLOG) => (
                        <Link href={`/blogs/${blog.id}`} key={blog.id}>
                            <tr style={{ padding: '5px' }}>
                                <td>{blog.categories.map((category, idx) => category.concat((idx + 1) === blog.categories.length ? '' : ', '))}</td>
                                <td>{blog.title}</td>
                                <td>{blog.date}</td>
                                <td>{blog.description}</td>
                                <td>{blog.tags.map((tag, idx) => '#'.concat(tag).concat((idx + 1) === blog.tags.length ? '' : ' '))}</td>
                            </tr>
                        </Link>
                    ))
                }
            </table>
        </>
    )
}

// export const getStaticProps: GetStaticProps = async () => {
//     const dir = process.cwd().concat('/__posts'); // 마크다운 블로그 데이터가 존재하는 디렉토리 참조

//     const files: string[] = await fs.readdirSync(dir); // files객체에 마크다운 블로그 데이터 세팅

//     const blogList = files.map((fileName: string) => {
//         const id = fileName.replace(/\.md$/, ''); // 파일이름명 세팅

//         const file = fs.readFileSync(process.cwd().concat(`/__posts/${id}.md`), 'utf-8'); // 해당파일 파일객체 선언

//         const contents = fm(file).attributes; // front-matter 라이브러리로 마크다운 메타데이터 파싱

//         return {
//             id,
//             ...contents,
//         }
//     });

//     return {
//         props: {
//             blogList,
//         },
//     };
// };

export default Home
