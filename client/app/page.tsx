'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function Home() {

  const [age, setAge] = useState<any>('')

  const [food, setFood] = useState<any>(null)

  const askAI = (age: any) => {
    axios.get(`http://localhost:8000/api/suggest/${age}`).then((res) => {
      // console.log(res)
      setFood(res.data.menu)
    })
  }

  return (
    <div className="flex w-full h-[100vh] justify-center items-center flex-col">

      {food ? <div className="w-full h-[100vh] bg-black/50 flex justify-center items-center fixed">
        <Card className="w-[300px] text-center">
          <CardHeader>
            <CardTitle>
              <p className="font-[kanit] font-[100] text-[25px]">อายุ {age} แดกนี่ซ่ะ</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-[kanit] font-[200]">{food}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => {
              setFood(null)
              setAge('')
            }} className="w-full cursor-pointer font-[kanit] font-[200]">รู้เรื่อง</Button>
          </CardFooter>
        </Card>
      </div> : null}


      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="font-bold from-blue-500 to-purple-500 to-30% font-[minecraft] text-[30px] bg-gradient-to-r bg-clip-text text-transparent">AI NUTRIENTS</CardTitle>
          <CardDescription className="font-[kanit] font-[100] text-[16px]">ให้ AI แนะนำเมนูเหมาะกับอายุกันเถอะ!</CardDescription>
        </CardHeader>
        <CardContent>
          <Input maxLength={2} minLength={1} value={age} className="text-center font-[kanit] font-[100]" onChange={(e) => {
            setAge(e.target.value)
          }} placeholder="อายุเท่าไหร่นิ?"></Input>
        </CardContent>
        <CardFooter>
          <Button onClick={() => {
            if (!age) {
              toast.error("กรุณากรอกอายุ")
            } else {
              askAI(age)
            }
          }} className="bold w-full cursor-pointer" variant={'default'}>Ask AI</Button>
        </CardFooter>
      </Card>

      <div className="w-[300px] mt-10">
        <Progress value={age}></Progress>
      </div>

      <Toaster position="bottom-center" toastOptions={{
        classNames: {
          toast: 'font-[kanit]'
        }
      }}></Toaster>
    </div>
  );
}
