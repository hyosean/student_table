import React, {useEffect, useRef, useState} from 'react';

const Table = () => {
	const [students, setStudents] = useState([]);
	const [id, setId] = useState(1);
	const nameRef = useRef();
	const numRef = useRef();
	const majorRef = useRef();
	// {
	//     id :''
	//     name : ''
	//     num : ''
	//     major : ''
	// }
	useEffect(() => {}, [students]);

	const onClickButtonAdd = () => {
		console.log({
			name: nameRef.current.value,
			num: numRef.current.value,
			major: majorRef.current.value,
		});

		//빈값체크
		if (nameRef.current.value !== '' && numRef.current.value !== '' && majorRef.current.value !== '') {
			//반환
			setStudents([
				...students,
				{
					id: id,
					name: nameRef.current.value,
					num: numRef.current.value,
					major: majorRef.current.value,
				},
			]);
			//초기화
			setId(id + 1);
			nameRef.current.value = '';
			numRef.current.value = '';
			majorRef.current.value = '';
		}
	};

	//삭제
	const onClickDelate = (id) => {
		let list = [...students];

		list = list.filter((cur) => cur.id !== id);
		//id값 동기화
		list.map((cur, idx) => {
			cur.id = idx + 1;
		});

		setStudents(list);
	};

	//수정
	const onClickInput = (e, value, idx) => {
		if (e.target.readOnly) {
			e.target.readOnly = false;
			let changeValue = window.prompt('변경 될 값을 입력해 주세요.');
			//빈값 일시
			if (changeValue === '') {
				return false;
			}
			//변환 값 출력
			let list = [...students];
			list.map((cur) => {
				if (cur.name === value && cur.id === idx) {
					cur.name = changeValue;
				} else if (cur.num === value && cur.id === idx) {
					cur.num = changeValue;
				} else if (cur.major === value && cur.id === idx) {
					cur.major = changeValue;
				}
			});
			setStudents(list);
			e.target.readOnly = true;
		}
	};

	return (
		<table width="600px" border="1">
			<caption style={{display: 'none'}}>학생 명부</caption>
			<colgroup>
				<col width="100px"></col>
				<col width="100px"></col>
				<col width="100px"></col>
				<col width="100px"></col>
				<col width="100px"></col>
			</colgroup>
			<tbody>
				<tr>
					<th>번호</th>
					<th>이름</th>
					<th>학번</th>
					<th>학과</th>
					<th>삭제</th>
				</tr>

				{students.map((student, idx) => (
					<tr key={idx + 'tr'}>
						<td>{student.id}</td>
						<td>
							<input
								type="text"
								value={student.name}
								readOnly
								onDoubleClick={(e) => onClickInput(e, student.name, student.id)}
							/>
						</td>
						<td>
							<input
								type="text"
								value={student.num}
								readOnly
								onDoubleClick={(e) => onClickInput(e, student.num, student.id)}
							/>
						</td>
						<td>
							<input
								type="text"
								value={student.major}
								readOnly
								onDoubleClick={(e) => onClickInput(e, student.major, student.id)}
							/>
						</td>
						<td>
							<button onClick={() => onClickDelate(student.id)}>삭제</button>
						</td>
					</tr>
				))}
				<tr>
					<td>
						<strong></strong>
					</td>
					<td>
						<input type="text" ref={nameRef} />
					</td>
					<td>
						<input type="text" ref={numRef} />
					</td>
					<td>
						<input type="text" ref={majorRef} />
					</td>
					<td>
						<button onClick={() => onClickButtonAdd()}>추가</button>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default Table;
//Delate이해를 바탕으로 업데이트 만들어오기
//관리페이지 (엑셀)
