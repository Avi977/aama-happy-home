import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, X, Send, Bot, User, HelpCircle, Clock, MapPin, Phone, Mail } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'quick_reply' | 'info_card';
}

interface QuickReply {
  text: string;
  action: string;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Aama Daycare's AI assistant. I can help answer questions about our programs, hours, curriculum, and more. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Enhanced AI Response Logic with comprehensive knowledge base
  const getAIResponse = async (userMessage: string): Promise<{ text: string; quickReplies?: QuickReply[] }> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const message = userMessage.toLowerCase();
    
    // Hours and Schedule
    if (message.includes('hour') || message.includes('time') || message.includes('open') || message.includes('close') || message.includes('when')) {
      return {
        text: "Aama Daycare is open Monday through Friday from 7:30 AM to 6:00 PM. We're closed on weekends and major US holidays including New Year's Day, Memorial Day, Independence Day, Labor Day, Thanksgiving, and Christmas.",
        quickReplies: [
          { text: "Show me daily schedule", action: "daily_schedule" },
          { text: "What about holidays?", action: "holidays" },
          { text: "Book a tour", action: "tour" }
        ]
      };
    }
    
    // Programs and Age Groups
    if (message.includes('program') || message.includes('age') || message.includes('toddler') || message.includes('preschool') || message.includes('care')) {
      return {
        text: "We offer three main programs: Toddler Care (12 months - 3 years), Preschool Program (3-5 years), and After School Care (5-12 years). Each program is tailored to the developmental needs of that age group with age-appropriate activities and learning goals.",
        quickReplies: [
          { text: "Tell me about toddlers", action: "toddler_program" },
          { text: "Preschool details", action: "preschool_program" },
          { text: "After school care", action: "after_school" }
        ]
      };
    }
    
    // Curriculum
    if (message.includes('curriculum') || message.includes('learn') || message.includes('teach') || message.includes('education') || message.includes('what do you teach')) {
      return {
        text: "We use the Mother Goose Time curriculum, a research-backed, play-based program designed to nurture growth and learning in toddlers and preschoolers. It focuses on letters, numbers, colors, shapes, social development, and creative expression through fun, hands-on activities.",
        quickReplies: [
          { text: "Show me daily activities", action: "daily_activities" },
          { text: "Learning approach", action: "learning_approach" },
          { text: "More about curriculum", action: "curriculum_details" }
        ]
      };
    }
    
    // Location and Address
    if (message.includes('location') || message.includes('address') || message.includes('where') || message.includes('directions') || message.includes('san ramon')) {
      return {
        text: "We're located at 737 Birdwood Ct, San Ramon, CA 94582. We serve the San Ramon area and are easily accessible from major roads. Our facility is in a safe, residential neighborhood perfect for families.",
        quickReplies: [
          { text: "Get directions", action: "directions" },
          { text: "Show on map", action: "show_map" },
          { text: "Service area", action: "service_area" }
        ]
      };
    }
    
    // Contact Information
    if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('call') || message.includes('reach')) {
      return {
        text: "You can reach us at (510) 778-3220 or email us at aamadaycare@gmail.com. We're happy to answer any questions or schedule a tour of our facility. Our staff typically responds within a few hours during business days.",
        quickReplies: [
          { text: "Call now", action: "call_now" },
          { text: "Send email", action: "send_email" },
          { text: "Schedule tour", action: "schedule_tour" }
        ]
      };
    }
    
    // Tour and Visit
    if (message.includes('tour') || message.includes('visit') || message.includes('see') || message.includes('come') || message.includes('look around')) {
      return {
        text: "We'd love to show you around! You can schedule a tour by calling us at (510) 778-3220 or by using the 'Book a Tour' button on our website. Tours typically last 30-45 minutes and give you a chance to see our facilities, meet our staff, and ask questions.",
        quickReplies: [
          { text: "Book tour online", action: "book_tour_online" },
          { text: "What to expect", action: "tour_expectations" },
          { text: "Best time to visit", action: "best_time" }
        ]
      };
    }
    
    // Safety and Security
    if (message.includes('safe') || message.includes('security') || message.includes('protect') || message.includes('secure') || message.includes('safety')) {
      return {
        text: "Your child's safety is our top priority. We have secure facilities with controlled access, trained staff certified in CPR and first aid, and follow strict safety protocols. We maintain clean, secure environments and conduct regular safety drills.",
        quickReplies: [
          { text: "Safety protocols", action: "safety_protocols" },
          { text: "Staff training", action: "staff_training" },
          { text: "Emergency procedures", action: "emergency_procedures" }
        ]
      };
    }
    
    // Staff and Teachers
    if (message.includes('staff') || message.includes('teacher') || message.includes('miss') || message.includes('caregiver') || message.includes('who works')) {
      return {
        text: "Our experienced team creates a nurturing environment where children thrive emotionally, socially, and intellectually. Miss Rasu and our staff are compassionate, certified professionals who genuinely love working with children. We maintain low staff-to-child ratios for personalized attention.",
        quickReplies: [
          { text: "Staff qualifications", action: "staff_qualifications" },
          { text: "Staff to child ratio", action: "staff_ratio" },
          { text: "Meet the team", action: "meet_team" }
        ]
      };
    }
    
    // Daily Activities
    if (message.includes('daily') || message.includes('schedule') || message.includes('activity') || message.includes('routine') || message.includes('what do kids do')) {
      return {
        text: "Our daily schedule includes structured learning, outdoor play, creative activities, meals, and rest time. We balance fun, learning, and rest so every child enjoys a happy and healthy day. Activities include circle time, arts & crafts, outdoor play, and educational games.",
        quickReplies: [
          { text: "Show full schedule", action: "full_schedule" },
          { text: "Sample activities", action: "sample_activities" },
          { text: "Outdoor time", action: "outdoor_activities" }
        ]
      };
    }
    
    // Meals and Food
    if (message.includes('food') || message.includes('meal') || message.includes('eat') || message.includes('snack') || message.includes('lunch')) {
      return {
        text: "We provide healthy, nutritious meals and snacks throughout the day. Our meal schedule includes breakfast, morning snack, lunch, and afternoon snack. We accommodate dietary restrictions and allergies, and all meals are prepared with fresh, wholesome ingredients.",
        quickReplies: [
          { text: "Meal schedule", action: "meal_schedule" },
          { text: "Dietary accommodations", action: "dietary_accommodations" },
          { text: "Sample menu", action: "sample_menu" }
        ]
      };
    }
    
    // Enrollment and Registration
    if (message.includes('enroll') || message.includes('register') || message.includes('join') || message.includes('start') || message.includes('sign up')) {
      return {
        text: "To enroll your child, please contact us to check availability and schedule a tour. We'll guide you through the enrollment process, including required forms, health records, and documentation. We recommend starting the process early as spots can fill up quickly.",
        quickReplies: [
          { text: "Check availability", action: "check_availability" },
          { text: "Required documents", action: "required_documents" },
          { text: "Enrollment process", action: "enrollment_process" }
        ]
      };
    }
    
    // Pricing and Cost
    if (message.includes('price') || message.includes('cost') || message.includes('fee') || message.includes('rate') || message.includes('how much')) {
      return {
        text: "Our pricing varies by program and schedule. For current rates and availability, please contact us directly at (510) 778-3220. We're happy to discuss our competitive pricing, any available discounts, and payment options that work for your family.",
        quickReplies: [
          { text: "Payment options", action: "payment_options" },
          { text: "Discounts available", action: "discounts" },
          { text: "Financial assistance", action: "financial_assistance" }
        ]
      };
    }

    // Quick reply actions
    if (message.includes('daily schedule') || message.includes('show me daily schedule')) {
      return {
        text: "Our daily schedule runs from 7:30 AM to 6:00 PM and includes: 7:30 AM - Welcome & Free Play, 8:30 AM - Breakfast, 9:00 AM - Circle Time, 9:30 AM - Learning Activities, 10:30 AM - Morning Snack, 11:00 AM - Outdoor Play, 12:00 PM - Lunch, 1:00 PM - Nap Time, 2:30 PM - Quiet Activities, 3:00 PM - Afternoon Snack, 3:30 PM - Outdoor Adventures, 4:30 PM - Creative Play, 6:00 PM - Pick-up."
      };
    }

    if (message.includes('toddler program') || message.includes('tell me about toddlers')) {
      return {
        text: "Our Toddler Care program (12 months - 3 years) focuses on gentle introduction to learning through play, social interaction, and creative activities. We provide potty training support, music and movement, sensory play, and story time. Our staff maintains a 1:4 staff-to-child ratio for personalized attention."
      };
    }

    if (message.includes('preschool program') || message.includes('preschool details')) {
      return {
        text: "Our Preschool Program (3-5 years) is a comprehensive early learning program preparing children for kindergarten success. We focus on letter and number recognition, art and crafts, science exploration, and school readiness skills. Children develop social skills, independence, and a love for learning."
      };
    }

    if (message.includes('after school care') || message.includes('after school')) {
      return {
        text: "Our After School Care (5-12 years) provides a safe, supervised environment with homework help and recreational activities. We offer homework assistance, outdoor play, educational games, and healthy snacks. Perfect for working parents who need reliable after-school care."
      };
    }
    
    // Default response for other questions
    return {
      text: "That's a great question! While I have comprehensive information about our programs, hours, curriculum, and general operations, for specific details or to schedule a tour, I'd recommend calling us at (510) 778-3220 or emailing aamadaycare@gmail.com. Our staff would be happy to help!",
      quickReplies: [
        { text: "Call now", action: "call_now" },
        { text: "Book a tour", action: "book_tour" },
        { text: "More questions", action: "more_questions" }
      ]
    };
  };

  const handleQuickReply = async (action: string) => {
    let response = "";
    
    switch (action) {
      case "call_now":
        window.location.href = "tel:5107783220";
        return;
      case "send_email":
        window.location.href = "mailto:aamadaycare@gmail.com";
        return;
      case "book_tour":
        response = "Great choice! You can book a tour by calling us at (510) 778-3220 or using the 'Book a Tour' button on our website. Tours typically last 30-45 minutes and give you a complete view of our facility.";
        break;
      case "directions":
        window.open("https://www.google.com/maps/dir/?api=1&destination=737+Birdwood+Ct,+San+Ramon,+CA,+94582", "_blank");
        return;
      case "show_map":
        window.open("https://www.google.com/maps/place/737+Birdwood+Ct,+San+Ramon,+CA+94582", "_blank");
        return;
      default:
        response = "I'd be happy to help with that! Could you please rephrase your question or call us at (510) 778-3220 for immediate assistance.";
    }

    if (response) {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiMessage]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowQuickReplies(false);

    try {
      const aiResponse = await getAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiMessage]);
      
      if (aiResponse.quickReplies) {
        setShowQuickReplies(true);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try calling us at (510) 778-3220 for immediate assistance.",
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 bg-primary hover:bg-primary/90"
        size="icon"
      >
        <MessageCircle className="w-8 h-8" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Aama Daycare AI Assistant</span>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-800 border'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="w-4 h-4" />
                    <span className="text-xs opacity-70">AI is typing...</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Buttons */}
          {showQuickReplies && (
            <div className="px-4 py-2 bg-gray-100 border-t">
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => handleQuickReply("call_now")}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Call Now
                </Button>
                <Button
                  onClick={() => handleQuickReply("book_tour")}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  Book Tour
                </Button>
                <Button
                  onClick={() => handleQuickReply("directions")}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  Directions
                </Button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Aama Daycare..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="icon"
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
