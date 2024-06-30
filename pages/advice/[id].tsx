import { faChevronLeft, faHouse, faQ } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { Line } from '..';
import { useEffect, useState } from 'react';
import { supabase } from '../../libs/supabaseClient';
import { Tables } from '../../database.types';
import { cls, formatRelativeTime, LineBreaker } from '../../libs/utility';
import { useInput } from '../../libs/hooks/useInput';
import { AdviceComment, AdviceDetail, loginUserState } from '../../libs/store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BasicPopup } from '../../components/basicPopup';
import { faFaceFrownOpen } from '@fortawesome/free-regular-svg-icons';

const AdviceDetailPage = () => {
	const router = useRouter();
	const [loginUser] = useRecoilState(loginUserState);
	const commentInput = useInput({ defaultValue: '' });
	const detailId = Number(router.query.id);
	const [detail, setDetail] = useState<AdviceDetail>();
	const [editDetail, setEditDetail] = useState(false);
	const [newTitle, setNewTitle] = useState(detail?.title);
	const [newContent, setNewContent] = useState(detail?.content);
	const [showDeletePopup, setShowDeletePopup] = useState(false);

	const handleEditToggle = () => {
		setEditDetail(!editDetail);
		if (!editDetail) {
			setNewTitle(detail?.title);
			setNewContent(detail?.content);
		}
	};

	const handleDeleteToggle = () => {
		setShowDeletePopup(true);
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.target.value);
	};

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNewContent(e.target.value);
	};

	const handleEditSubmit = () => {
		updateDetail(detail?.id, newTitle, newContent);
		setEditDetail(false);
	};

	const [comments, setComments] = useState<AdviceComment[]>([]);
	const [showDeleteCommentPopup, setShowDeleteCommentPopup] = useState(false);
	const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

	const getDetail = async () => {
		try {
			// 1. `advice` 테이블에서 데이터를 가져옵니다.
			const { data: advice, error: adviceError } = await supabase
				.from('advice')
				.select('*')
				.eq('id', detailId)
				.limit(1)
				.single();

			if (adviceError) throw adviceError;

			if (advice) {
				// 2. `user_id`를 사용하여 `profile` 테이블에서 `nickname`을 가져옵니다.
				const { data: profile, error: profileError } = await supabase
					.from('profile')
					.select('nickname')
					.eq('user_id', advice.user_id ?? '')
					.single();

				if (profileError) throw profileError;

				// 3. `nickname`을 `advice` 데이터에 병합합니다.
				const detailWithNickname: AdviceDetail = {
					...advice,
					nickname: profile.nickname
				};

				// 4. 조회수를 증가시키고, `detail` 상태를 업데이트합니다.
				await increasePostViews(detailId);
				setDetail(detailWithNickname);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const updateDetail = async (id, newTitle, newContent) => {
		try {
			const { data, error } = await supabase
				.from('advice')
				.update({ title: newTitle, content: newContent })
				.eq('id', id)
				.select()
				.single();

			if (error) {
				console.log(error);
				return;
			}

			if (data) {
				setDetail(data);
			}
		} catch (error) {
			console.error('Error updating detail:', error);
		}
	};

	const deleteDetail = async (id) => {
		try {
			const { data, error } = await supabase.from('advice').delete().eq('id', id).select().single();

			if (error) {
				console.log(error);
				return;
			}

			if (data) {
				router.back();
			}
		} catch (error) {
			console.error('Error deleting detail:', error);
		}
	};

	const getComments = async () => {
		try {
			const { data: comments, error: commentsError } = await supabase
				.from('advice_comment')
				.select('*')
				.eq('advice_id', detailId)
				.order('created_at', { ascending: false });

			if (commentsError) throw commentsError;

			if (comments.length === 0) {
				setComments([]);
				return;
			}

			const { data: profiles, error: profilesError } = await supabase
				.from('profile')
				.select('user_id, nickname')
				.in(
					'user_id',
					comments.map((comment) => comment.author_id)
				);

			if (profilesError) throw profilesError;

			const commentsWithNicknames = comments.map((comment) => {
				const profile = profiles.find((profile) => profile.user_id === comment.author_id);
				return {
					...comment,
					nickname: profile ? profile.nickname : ''
				};
			});

			setComments(commentsWithNicknames);
		} catch (error) {
			console.error(error);
		}
	};

	const deleteComment = async (id: number) => {
		const { error } = await supabase.from('advice_comment').delete().eq('id', id);

		if (error) {
			console.error(error);
			return;
		}

		getComments();
	};

	const editComment = async (commentId, newComment) => {
		try {
			const { error } = await supabase.from('advice_comment').update({ content: newComment }).eq('id', commentId);

			if (error) throw error;

			setComments((prevComments) =>
				prevComments.map((comment) =>
					comment.id === commentId ? { ...comment, comment: newComment } : comment
				)
			);

			getComments();
		} catch (error) {
			console.error('Error updating comment:', error);
		}
	};

	const handleCommentSubmit = async () => {
		if (!commentInput.value.trim()) return;

		if (!loginUser) {
			alert('로그인 후 이용해주세요.');
			return;
		}

		const { error } = await supabase
			.from('advice_comment')
			.insert([{ advice_id: detailId, content: commentInput.value }]);

		if (error) {
			console.log(error);
			return;
		}

		commentInput.setValue('');
		getComments();
	};

	const handleEditComment = (id: number, newComment: string) => {
		editComment(id, newComment);
	};

	const handleDeleteComment = (id: number) => {
		setShowDeletePopup(true);
		setSelectedCommentId(id);
	};

	useEffect(() => {
		getDetail();
		getComments();
	}, [detailId]);

	return (
		<div className="flex flex-col pb-[70px]">
			{/* 아이콘 영역 */}
			<div className="flex justify-between mt-4 sm:px-4">
				<FontAwesomeIcon
					icon={faChevronLeft}
					className="w-5 h-5 cursor-pointer"
					onClick={() => {
						router.push('/advice');
					}}
				/>
				<FontAwesomeIcon
					icon={faHouse}
					className="w-5 h-5 cursor-pointer"
					onClick={() => {
						router.push('/');
					}}
				/>
			</div>
			{/*  해당아이디 */}
			<div className="sm:px-4">
				<div className="flex items-start mt-8 space-x-2">
					<FontAwesomeIcon icon={faQ} className="w-5 h-5 text-orange-400" />
					{editDetail ? (
						<input
							value={newTitle}
							onChange={handleTitleChange}
							className="text-[16px] font-bold flex-grow border rounded-4 px-2"
						/>
					) : (
						<div className="text-[16px] font-bold">{detail?.title}</div>
					)}
				</div>
				<div className="flex space-x-2 text-11 text-zinc-400">
					<span>{detail?.nickname}</span>
					<span>{formatRelativeTime(detail?.created_at)}</span>
				</div>
				{editDetail ? (
					<textarea
						value={newContent}
						onChange={handleContentChange}
						className="text-[13px] text-zinc-500 mt-4 min-h-[80px] w-full border p-2 rounded-4 resize-none"
					/>
				) : (
					<div className="text-[13px] text-zinc-500 mt-4 min-h-[80px]">
						{detail ? LineBreaker(detail.content) : '로딩중입니다...'}
					</div>
				)}
				<div className="flex"></div>
				{loginUser?.id === detail?.user_id && (
					<>
						{editDetail ? (
							<div className="flex mt-1 space-x-2">
								<button className="text-zinc-400 text-10" onClick={handleEditSubmit}>
									완료
								</button>
								<button className="text-zinc-400 text-10" onClick={handleEditToggle}>
									취소
								</button>
							</div>
						) : (
							<>
								<button
									className="mt-2 text-white px-2 py-0.5 rounded-4 text-10 bg-zinc-300"
									onClick={handleEditToggle}
								>
									수정
								</button>
								<button
									className="ml-1 mt-2 text-white px-2 py-0.5 rounded-4 text-10 bg-red-300"
									onClick={handleDeleteToggle}
								>
									삭제
								</button>
							</>
						)}
					</>
				)}
				<div className="flex mt-5 space-x-3">
					<div className="flex space-x-1 text-[11px] text-zinc-400">
						<span>조회수</span>
						<span>{(detail?.views ?? 0) + 1}</span>
					</div>
					<div className="text-11 text-zinc-400">|</div>
					<div className="flex space-x-1 text-[11px] text-zinc-400">
						{formatRelativeTime(detail?.created_at ?? '')}
					</div>
				</div>
			</div>
			<div className="w-full h-0.5 mt-1 bg-zinc-100 mb-4"></div>
			{/* 댓글 달기 */}
			<div className="flex flex-col mt-4 sm:px-4">
				<textarea
					{...commentInput.props}
					className="w-full p-2 border rounded-md resize-none text-12"
					placeholder="댓글을 작성하세요."
				/>
				<button
					onClick={handleCommentSubmit}
					className="self-end px-4 py-2 mt-2 text-white bg-orange-400 rounded-md rounded-4 text-11"
				>
					댓글 작성
				</button>
			</div>
			<div className="flex flex-col space-y-4 sm:px-4">
				<div className="text-[12px]">
					총 <span className="text-orange-400 font-weight-600">{comments?.length ?? 0}</span>개의 답변이
					있어요
				</div>
			</div>
			{/* 문의 답변 */}
			{comments.length === 0 ? (
				<div className="flex flex-col items-center pt-10 space-y-4">
					<FontAwesomeIcon icon={faFaceFrownOpen} className="w-9 h-9 text-zinc-400" />
					<div className="text-center text-14 text-zinc-400">
						아직 답변이 없어요. 첫번째 답변을 달아보세요!
					</div>
				</div>
			) : (
				<div className="flex flex-col">
					{comments.map((comment) => (
						<CommentItem
							key={comment.id}
							comment={comment}
							onEdit={handleEditComment}
							onDelete={handleDeleteComment}
						/>
					))}
				</div>
			)}
			{showDeletePopup && (
				<BasicPopup
					title="이 글을 삭제합니다"
					content={'삭제된 글은 복구할 수 없어요!\n삭제하시겠어요?'}
					rightButtonTitle="삭제할게요"
					onLeftButtonClicked={() => setShowDeletePopup(false)}
					onRightButtonClicked={() => {
						setShowDeletePopup(false);
						deleteDetail(detailId);
					}}
				/>
			)}
			{showDeleteCommentPopup && (
				<BasicPopup
					title="댓글을 삭제합니다"
					content={'삭제된 댓글은 복구할 수 없어요!\n삭제하시겠어요?'}
					rightButtonTitle="삭제할게요"
					onLeftButtonClicked={() => setShowDeleteCommentPopup(false)}
					onRightButtonClicked={() => {
						setShowDeleteCommentPopup(false);

						if (selectedCommentId) {
							deleteComment(selectedCommentId);
						}
					}}
				/>
			)}
		</div>
	);
};

export default AdviceDetailPage;

interface InfoItemProps {
	id: number;
	title: string;
	content: string;
}

const InfoItem = ({ id, title, content }: InfoItemProps) => {
	return (
		<div className={cls('flex flex-col px-2 py-3 mx-2 space-y-1', id === 6 ? '' : 'border-b border-zinc-100')}>
			<div className="text-[12px] text-gray-500 font-medium">{title}</div>
			<div className="text-[14px] font-semibold">{content}</div>
		</div>
	);
};

const increasePostViews = async (detailId: number): Promise<void> => {
	try {
		const { error } = await supabase.rpc('increment_views', { detail_id: detailId });

		if (error) {
			throw error;
		}
	} catch (error: any) {
		console.error('Error updating views:', error.message);
	}
};

interface CommentItemProps {
	comment: AdviceComment;
	onEdit: (id: number, newComment: string) => void;
	onDelete: (id: number) => void;
}
const CommentItem = ({ comment, onEdit, onDelete }: CommentItemProps) => {
	const loginUser = useRecoilValue(loginUserState);
	const [edit, setEdit] = useState(false);
	const [newContent, setNewContent] = useState(comment.content ?? '');

	const handleEditToggle = () => {
		setEdit(!edit);
		if (!edit) {
			setNewContent(comment.content ?? '');
		}
	};

	const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewContent(e.target.value);
	};

	const handleEditSubmit = () => {
		onEdit(comment.id, newContent);
		setEdit(false);
	};

	const handleDelete = () => {
		onDelete(comment.id);
	};

	return (
		<div className="flex flex-col w-full p-4 space-y-2 border-b border-zinc-100">
			<div className="flex items-center space-x-2">
				<div className="text-[12px] text-zinc-500 font-weight-500">{comment.nickname}</div>
				<div className="text-[10px] text-zinc-400">{formatRelativeTime(comment.created_at)}</div>
			</div>
			{edit ? (
				<div className="flex space-x-2">
					<input
						value={newContent}
						onChange={handleEditChange}
						className="flex-grow border p-1 text-[14px]"
					/>
					<button className="text-zinc-400 text-10" onClick={handleEditSubmit}>
						완료
					</button>
					<button className="text-zinc-400 text-10" onClick={handleEditToggle}>
						취소
					</button>
				</div>
			) : (
				<div className="text-[13px]">{comment.content}</div>
			)}
			{loginUser?.id === comment.author_id && (
				<div className="flex space-x-2">
					<button className="text-zinc-400 text-10" onClick={handleEditToggle}>
						{edit ? '취소' : '수정'}
					</button>
					<button className="text-zinc-400 text-10" onClick={handleDelete}>
						삭제
					</button>
				</div>
			)}
		</div>
	);
};
