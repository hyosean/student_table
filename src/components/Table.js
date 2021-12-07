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

	const onClickButton = () => {
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
		list.map((cur, idx) => {
			cur.id = idx + 1;
		});

		setStudents(list);
	};

	return (
		<table width="600px" border="1">
			<thead>
				<caption style={{display: 'none'}}>학생 명부</caption>
				<colgroup>
					<col width="100px"></col>
					<col width="100px"></col>
					<col width="100px"></col>
					<col width="100px"></col>
					<col width="100px"></col>
					<col width="100px"></col>
				</colgroup>
			</thead>
			<tbody>
				<tr>
					<th>번호</th>
					<th>이름</th>
					<th>학번</th>
					<th>학과</th>
					<th>수정</th>
					<th>삭제</th>
				</tr>

				{students.map((student, idx) => (
					<tr key={idx + 'tr'}>
						<td>{student.id}</td>
						<td>{student.name}</td>
						<td>{student.num}</td>
						<td>{student.major}</td>
						<td>
							<button>수정</button>
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
					<td colSpan="2">
						<button onClick={() => onClickButton()}>추가</button>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default Table;
//Delate이해를 바탕으로 업데이트 만들어오기
//관리페이지 (엑셀)
