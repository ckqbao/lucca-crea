import React from 'react';
import { Spinner } from 'reactstrap';


const Loading=(props)=>{

	const styles = {
		full:{
			backgroundColor:'rgba(255,255,255,0.98)', 
			width:'100%', 
			height:'105%', 
			position:'fixed', 
			zIndex:'1000',
			top:0,
			left:0
		},
		table:{
			backgroundColor:'rgba(255,255,255,0.7)', 
			width:'100%', 
			height:'100%', 
			position:'absolute', 
			zIndex:'1000'
		},
		fullSpinner:{
			position:'fixed', 
			top:'45%', 
			left:'50%', 
			zIndex:'1000'
		},
		tableSpinner:{
			position:'fixed', 
			top:'45%', 
			left:'48%', 
			zIndex:'1000'
		}
	}

	if(props.isLoading){
		return(
			<div style={props.tableLoader ? styles.table : styles.full}>
				<div style={props.tableLoader ? styles.tableSpinner : styles.fullSpinner}>
					<Spinner className='text-primary'  animation='border'>	
					{' '}						
					</Spinner>	
		        </div>	
	        </div>	
		)
	}else{
		return null
	}
}

export default Loading;