import Appbar from '../components/Appbar';
import BlogCard from '../components/BlogCard';

function Blogs() {
	return (
		<div className=''>
			<Appbar />
			<div className='flex justify-center p-4 '>
				<div className=''></div>
				<div className='max-w-xl'>
					<BlogCard
						authorName='aash'
						title='How to Sign Your Commits: A Guide for Git Users'
						content='Code Integrity: Signing your commits verifies that they were indeed authored by you and have not been tampered with since. This helps maintain the integrity of the codebase and ensures that only trusted changes are accepted.Attribution: Signed commits provide clear attribution, allowing project maintainers and collaborators to identify the author of each change accurately.
					Trust and Verification: By signing your commits with a cryptographic key, you establish trust in your contributions. Other developers can verify the authenticity of your commits using your public key, thereby increasing confidence in the codebase.'
						publishDate='5 april 2024'
					/>
					<BlogCard
						authorName='aash'
						title='How to Sign Your Commits: A Guide for Git Users'
						content='Code Integrity: Signing your commits verifies that they were indeed authored by you and have not been tampered with since. This helps maintain the integrity of the codebase and ensures that only trusted changes are accepted.Attribution: Signed commits provide clear attribution, allowing project maintainers and collaborators to identify the author of each change accurately.
					Trust and Verification: By signing your commits with a cryptographic key, you establish trust in your contributions. Other developers can verify the authenticity of your commits using your public key, thereby increasing confidence in the codebase.'
						publishDate='5 april 2024'
					/>
				</div>
			</div>
		</div>
	);
}

export default Blogs;
