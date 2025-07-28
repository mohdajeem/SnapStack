import { generateComponentByGemini, refineComponentByGemini } from "./GeminiController.js";
import Session from "../models/Session.js";
import mongoose from "mongoose";
import User from "../models/User.js";

const createOrUpdateSession = async(req, res) => {
    const {userPrompt, sessionId} = req.body;
    const userId = req.user._id;
    console.log("userPrompt: ",userPrompt);
    console.log("sessionId: ",sessionId);
    console.log("Create Or Update Session called");
    if(!userPrompt) return res.status(400).json({success: false, message: "User prompt is required"});
    try{
        let session;
        let generatedCode;
        if(sessionId){
            // refine part
            session = await Session.findOne({_id: sessionId, user: userId});
            if(!session){
                return res.status(404).json({success: false, message: "Session not found"});
            }
            generatedCode = await refineComponentByGemini({
                userPrompt,
                currentCss: session.jsxCode,
                currentCss: session.cssCode
            });

            session.jsxCode = generatedCode.jsx;
            session.cssCode = generatedCode.css;
            session.chatHistory.push({role: 'user', content: userPrompt});
            session.chatHistory.push({role: 'assistant', content: JSON.stringify(generatedCode)});
        } else{
            generatedCode = await generateComponentByGemini({userPrompt});

            session = new Session({
                user: userId,
                title: generatedCode.title,
                jsxCode: generatedCode.jsx,
                cssCode: generatedCode.css,
                // start the chat histroy
                chatHistory: [
                    {role: 'user', content: userPrompt},
                    {role: 'assistant', content: JSON.stringify(generatedCode)}
                ]
            });
        }
        await session.save();
        if(!sessionId){
            await User.findByIdAndUpdate(userId, {$push: {sessions: session._id}});
        }
        res.status(200).json({
            success: true,
            message: sessionId ? "Component refined Successfully" : "Component generated successfully",
            session
        })
        
    } catch(err){
        res.status(500).json({message: "Server Error", error: err.message});
   }
}


const getAllUserSessions = async(req, res) => {
    try{
        const sessions = await Session.find({user: req.user._id}).sort({updatedAt: -1});
        res.status(203).json({
            success: true,
            count: sessions.length,
            message: "Here are all sessions",
            data: sessions
        })

    } catch(err){
        res.status(500).json({message: "Server Error", error: err.message});
    }
}

const getSessionById = async (req, res) => {
    try{
        const session = await Session.findOne({_id: req.params.id, user: req.user._id});
        if(!session){
            return res.status(404).json({message: "Session is not found"});
        }
        res.status(200).json({
            success: true,
            message: "here is your session",
            data: session
        });
    } catch(err){
        res.status(500).json({message: "Server Error", error: err.message});
    }
}

const editSessionCode = async (req, res) => {
    const {sessionId} = req.params;
    const {jsxCode, cssCode} = req.body;
    try{
        // console.log("edit session called");
        const session = await Session.findOne({_id: req.params.id, user: req.user._id});

        if(!session){
            return res.status(404).json({success: false, message: "Session not found or you do not have permission"});
        }

        if(jsxCode !== undefined) session.jsxCode = jsxCode;
        if(cssCode !== undefined) session.cssCode = cssCode;

        const updatedSession = await session.save();

        res.status(200).json({
            success: true,
            message: "Session updated successfully",
            session: updatedSession
        });
    } catch(err){
        res.status(500).json({message: "Server Error", error: err.message});
    }
}

export {createOrUpdateSession, getAllUserSessions, getSessionById, editSessionCode};