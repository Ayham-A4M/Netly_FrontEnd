import { Button } from "@/components/ui/button"

const NextPrevButtons = ({ stepNo, setStepNo, maximumStep,onNext }: { stepNo: number, setStepNo: React.Dispatch<React.SetStateAction<number>>, maximumStep: number,onNext:() => Promise<void> }) => {
    return (
        <div>
            <div className={`flex ${stepNo > 1 ? 'justify-between' : 'justify-end'} items-center`}>
                {
                    stepNo > 1 &&
                    <Button size="icon" variant="outline" type='button' className='text-[10px] cursor-pointer' onClick={() => { setStepNo(prev => prev - 1) }}>
                        Prev
                    </Button>
                }

                {
                    stepNo < maximumStep &&
                    <Button size="icon" variant="outline" type='button' className='text-[10px] cursor-pointer' onClick={()=>{onNext()}}>
                        Next
                    </Button>
                }


            </div>
            <div className="py-2 flex justify-evenly items-center">
                    {
                        [...Array(maximumStep)].map((_,i)=>(
                            <div key={i} className={`${i+1===stepNo?'bg-primary':'bg-gray-300 dark:bg-gray-200'} size-3 rounded-full`}></div>
                            
                        ))
                    }
            </div>
        </div>
    )
}

export default NextPrevButtons