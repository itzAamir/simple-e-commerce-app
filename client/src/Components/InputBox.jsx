export default function InputBox(props) {
	return (
		<div className={`${props.classes}`}>
			<label htmlFor={props.id} className="font-bold text-gray-600">
				{props.label}
			</label>
			<input
				type={props.type}
				id={props.id}
				className="mt-2 border-[2px] border-gray-500 outline-none rounded-md px-3 py-1 w-full focus:border-blue-500 hover:border-gray-400"
				value={props.value}
				onChange={(e) => props.onChange(e.target.value)}
			/>
		</div>
	);
}
